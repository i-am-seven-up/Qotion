"use client";

import { useUser } from "@clerk/nextjs";
import NewDocumentButton from "./NewDocumentButton";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useCollection } from "react-firebase-hooks/firestore";
import { query, where, collectionGroup, doc } from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import { DocumentData } from "firebase-admin/firestore";
import SidebarOption from "./SidebarOption";

interface RoomDocument extends DocumentData {
  createAt: string;
  role: "owner" | "editor";
  roomId: string;
  userId: string;
}

function Sidebar() {
  const { user } = useUser();

  const [data, loading, error] = useCollection(
    user &&
      query(
        collectionGroup(db, "rooms"),
        where("userId", "==", user.emailAddresses[0].toString())
      )
  );

  const [groupedData, setGroupedData] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>({
    owner: [],
    editor: [],
  });

  useEffect(() => {
    if (!data) return;

    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument;

        if (roomData.role === "owner") {
          acc.owner.push({
            id: curr.id,
            ...roomData,
          });
        }

        if (roomData.role === "editor") {
          acc.editor.push({
            id: curr.id,
            ...roomData,
          });
        }

        return acc;
      },
      {
        owner: [],
        editor: [],
      }
    );
    setGroupedData(grouped);
  }, [data]);
  const menuOptions = (
    <>
      <NewDocumentButton />

      <div className="flex py-4 flex-col space-y-4 md:max-w-36">
        {/* My documents */}
        {groupedData.owner.length === 0 ? (
          <h2 className="text-gray-600, font-semibold, text-sm">
            No documents found
          </h2>
        ) : (
          <>
            <h2 className="text-gray-600, font-semibold, text-sm">Documents</h2>
            {groupedData.owner.map((doc) => (
              <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
            ))}
          </>
        )}

        {/* Shared with me */}
        {groupedData.editor.length > 0 && (
          <>
            <h2 className="text-gray-500 font-semibold text-sm">
              Shared with Me
            </h2>
            {groupedData.editor.map((doc) => (
              <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
            ))}
          </>
        )}
      </div>
    </>
  );
  return (
    <div className="w-1/7  p-4 border-r md:p-5 flex flex-col">
      {/* Sidebar content for larger screens */}
      <div className="hidden md:inline">{menuOptions}</div>

      {/* Menu button for smaller screens */}
      <div className="inline md:hidden">
        <Sheet>
          <SheetTrigger>
            <img
              src="https://img.icons8.com/?size=100&id=dMz54mFbVirR&format=png&color=000000"
              className="w-6 h-6"
            />
          </SheetTrigger>
          <SheetContent
            className="w-[400px] sm:w-[540px] flex-1 z-[1000]"
            side={"left"}
          >
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>{menuOptions}</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
export default Sidebar;
