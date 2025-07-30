"use server";

import toastAlert from "@/components/ui/toast";
import { db } from "@/firebase";
import { adminDb } from "@/firebase-admin";
import { requireAuthOrThow } from "@/lib/auth/requireAuthOrThrow";
import liveblocks from "@/lib/liveblocks";
import { CREATE_DOC_STATUS } from "@/types/enums";
import { auth } from "@clerk/nextjs/server";
import { query } from "firebase/firestore";
import { useEffect } from "react";

export async function createNewDocument() {
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
