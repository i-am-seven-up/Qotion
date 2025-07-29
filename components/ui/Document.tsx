"use client";
import { FormEvent, startTransition, useEffect, useState, useTransition } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "./button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";

function Document({ id }: { id: string }) {
    const [data, loading, error] = useDocumentData(doc(db, "documents", id)); 
    const [input, setInput] = useState("");
    const [isUpdating, startTrasition] = useTransition();
    
    useEffect(() => {
        if(data){
            setInput(data.title);  
        }
    }, [data])
    const updateTitle = (e: FormEvent) => {
        e.preventDefault(); 

        if(input.trim()){
            startTransition(async ()=>{
                await updateDoc(doc(db,"documents", id), {
                    title: input, 
                });
            });
        }
    }
    return (
        <div>
            <div>
                <form onSubmit={updateTitle} className="flex p-4 gap-4">
                    {/* update name */}
                    <Input value={input} onChange={(e) => setInput(e.target.value)} className="font-semibold"/>
                    <Button type="submit" disabled={isUpdating}>{isUpdating ? "Updating..." : "Update"}</Button>
                    {/* owner? invite user / delete document */}
                </form>
            </div>

            <div>
                {/* manage users */}

                {/* avatar */}
            </div>

            {/* editor */}
        </div>
    )
}
export default Document