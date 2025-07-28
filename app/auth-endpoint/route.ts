import { requireAuthOrThow } from "@/lib/auth/requireAuthOrThrow";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { userInfo } from "os";
import { availableMemory, emit } from "process";

export async function POST(req: NextRequest) {
    requireAuthOrThow(); 
    const {sessionClaims} = await auth();
    const {rooms} = await req.json();  
    const session = liveblocks.prepareSession(sessionClaims?.email!, {
        userInfo: {
            name: sessionClaims?.fullName!, 
            email: sessionClaims?.email!,
            avatar: sessionClaims?.image!,  
        },
    })
}