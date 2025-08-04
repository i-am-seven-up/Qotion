import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";

import {
  addNewCollaborator,
  deleteDocument,
  getAllCollaborators,
  removeCollaborator,
} from "@/actions/actions";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { adminDb } from "@/firebase-admin";
import {
  RoomContext,
  useOthers,
  useRoom,
  useSelf
} from "@liveblocks/react";
import { create } from "domain";
import { setFips } from "crypto";
import {
  collectionGroup,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import { CollectionGroup, DocumentData } from "firebase-admin/firestore";
import { requireAuthOrThow } from "@/lib/auth/requireAuthOrThrow";
import { useUser } from "@clerk/nextjs";
import { useCollection } from "react-firebase-hooks/firestore";

function ManageUsers() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  //current users
  const self = useSelf();
  const others = useOthers();
  const allUsers = [self, ...others];

  const room = useRoom();

  const {user} = useUser(); 

  const [usersInRoom] = useCollection(user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))); 

  const handleRemoveUser = async (userId: string) => {
    startTransition(async () => {
        if(!user) return; 
      const { success } = await removeCollaborator(room.id, userId);

      if (success) {
        toast.success(`Removed ${userId} successfully`);
      } else {
        toast.error(`Error removed ${userId}`);
      }
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="secondary">
        <DialogTrigger>{`Users (${usersInRoom?.docs.length})`}</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Users with Access</DialogTitle>
          <DialogDescription>
            List of users who is currently able to access this document.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-col gap-2 space-y-4">
          {usersInRoom?.docs.map((doc) => (
            <div
              key={doc.data().userId}
              className="flex items-center justify-between"
            >
              <p>{doc.data().userId}</p>

              <div className="flex items-center gap-2">
                <p className="font-semibold">
                  {doc.data().role == "owner" ? "Owner" : "Editor"}
                </p>
                <Button onClick={() => handleRemoveUser(doc.data().userId)}>
                  {isPending ? "Removing..." : "Remove"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default ManageUsers;
