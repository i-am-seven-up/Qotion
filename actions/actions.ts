"use server";

import toastAlert from "@/components/ui/toast";
import { adminDb } from "@/firebase-admin";
import { CREATE_DOC_STATUS } from "@/types/enums";
import { auth } from "@clerk/nextjs/server";
import { useEffect } from "react";



export async function createNewDocument() {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    return {
      status: CREATE_DOC_STATUS.UNAUTHORIZED,
      message: "You must be logged in"
    }
  }

  const docCollectionRef = adminDb.collection("documents");
  const docRef = await docCollectionRef.add({
    title: "New Doc"
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
    message: "New document created"
  }
}

