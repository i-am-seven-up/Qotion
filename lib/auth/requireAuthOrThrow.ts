import { auth } from "@clerk/nextjs/server";

export async function requireAuthOrThow() {
    const {userId} = await auth(); 
    if(!userId) {
        console.log("error");
        throw new Error("Unauthorized"); 
    }
    console.log("ok"); 
    return {userId};
}