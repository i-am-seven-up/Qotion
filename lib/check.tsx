import toastAlert from "@/components/ui/toast";
import { auth } from "@clerk/nextjs/server";
import { useEffect } from "react";

async function ClientAuth() {
  
  const checkAuth = async () => {
    try {
        const { userId } = await auth(); // Await the promise returned by auth()
        if (!userId) {
            toastAlert({ title: "Unauthorized", message: "You must be logged in" });
            console.log("1"); 
        }
        else{
          toastAlert({ title: "HAHAHA", message: "HAY VCL" });
          console.log("2"); 
        }
    } catch (error) {
        console.error("Error checking authentication:", error);
    }
};
  await checkAuth();

  return null; // This component doesn't render anything visually
}

export default ClientAuth