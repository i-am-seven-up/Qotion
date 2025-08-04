"use server";

import toastAlert from "@/components/ui/toast";
import { db } from "@/firebase";
import { adminDb } from "@/firebase-admin";
import { requireAuthOrThow } from "@/lib/auth/requireAuthOrThrow";
import liveblocks from "@/lib/liveblocks";
import { CREATE_DOC_STATUS } from "@/types/enums";
import { auth } from "@clerk/nextjs/server";
import { useRoom } from "@liveblocks/react";
import {
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";

export async function createNewDocument() {
  await requireAuthOrThow();

  const { userId, sessionClaims } = await auth();

  if (!userId) {
    return {
      status: CREATE_DOC_STATUS.UNAUTHORIZED,
      message: "You must be logged in",
    };
  }

  const docCollectionRef = adminDb.collection("documents");
  const docRef = await docCollectionRef.add({
    title: "New Doc",
  });

  await adminDb
    .collection("user")
    .doc(sessionClaims?.email!)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      userId: sessionClaims?.email!,
      role: "owner",
      createdAt: new Date(),
      roomId: docRef.id,
    });

  return {
    status: CREATE_DOC_STATUS.SUCCESS,
    docId: docRef.id,
    message: "New document created",
  };
}

export async function deleteDocument(roomId: string) {
  await requireAuthOrThow();

  console.log("delete document (room)", roomId);

  try {
    await adminDb.collection("documents").doc(roomId).delete();

    const query = await adminDb
      .collectionGroup("rooms")
      .where("roomId", "==", roomId)
      .get();

    const batch = adminDb.batch();

    query.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    await liveblocks.deleteRoom(roomId);

    return { success: true };
  } catch (e) {
    console.log("error delete room docs", e);
    return { success: false };
  }
}

export async function addNewCollaborator(roomId: string, email: string) {
  await requireAuthOrThow();
  try {
    await adminDb
      .collection("user")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .set({
        userId: email,
        role: "editor",
        createAt: new Date(),
        roomId: roomId,
      });
    return { success: true };
  } catch (e) {
    return { success: false };
    console.error(e);
  }
}

export async function getAllCollaborators(roomId: string) {
  await requireAuthOrThow();
  const queryUsersInRoom = query(
    collectionGroup(db, "rooms"),
    where("roomId", "==", roomId)
  );
  const snapshot = await getDocs(queryUsersInRoom);
  return snapshot.docs;
}

export async function removeCollaborator(roomId: string, userId: string) {
  await requireAuthOrThow();

  try {
    const userDocRef = doc(db, "user", userId, "rooms", roomId);

    const userDoc = await getDoc(userDocRef);

    if (userDoc) await deleteDoc(userDocRef);

    return { success: true };
  } catch (e) {
    return { success: false };
    console.log(e);
    
  }
}
