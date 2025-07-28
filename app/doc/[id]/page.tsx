"use client";
import Document from "@/components/ui/Document";
import { Toaster } from "sonner";

 

function DocumentPage({params: {id}}: {
    params:{
        id: string; 
    }; 
}) {
    console.log(id); 
  return (
    
    
    
    <Document id={id}/>
 
  )
}
export default DocumentPage