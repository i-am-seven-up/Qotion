import { adminDb } from "@/firebase-admin";
import { requireAuthOrThow } from "@/lib/auth/requireAuthOrThrow";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { userInfo } from "os";
import { availableMemory, emit } from "process";

export async function POST(req: NextRequest) {

    requireAuthOrThow(); 

    const {sessionClaims} = await auth();
    const {room} = await req.json();  

    const session = liveblocks.prepareSession(sessionClaims?.email!, {
        userInfo: {
            name: sessionClaims?.fullName!, 
            email: sessionClaims?.email!,
            avatar: sessionClaims?.image!,  
        },
    })

    const roomsJoined = await adminDb
    .collectionGroup("rooms")
    .where("userId", "==", sessionClaims?.email)
    .get(); 

    const userInRoom = roomsJoined.docs.find(doc => doc.id  == room); 

    if(userInRoom?.exists){
        session.allow(room, session.FULL_ACCESS);
        const {body, status} = await session.authorize(); 

        console.log("You are authorized"); 
        console.log(body); 

        return new Response(body, {status}); 
    }  else {
        return NextResponse.json(
            {message: "You are not in this room"},
            {status: 403},
        ); 
    }
} 