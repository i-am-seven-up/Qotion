"use client";
import { useTransition } from "react";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { createNewDocument } from "@/actions/actions";
import { toast } from "sonner";
import { CREATE_DOC_STATUS } from "@/types/enums";
import toastAlert from "./toast";



function NewDocumentButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleCreateNewDocument = () => {
    startTransition(async () => {
      const result = await createNewDocument();

      if (result.status === CREATE_DOC_STATUS.UNAUTHORIZED) {
        // toast.custom(() => (
        //   <div className="bg-[#ffe6e6] border border-[#cc0000] text-[#cc0000] px-4 py-3 rounded-md shadow">

        //     <p className="flex font-semibold gap-2"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        //       <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
        //     </svg>Unauthorized</p>

        //     <div className="text-sm mt-1">{result.message}</div>
        //   </div>
        // )); 
        toastAlert({ title: "Unauthorized", message: result.message });

        return;
      }

      const docId = result.docId!;
      router.push(`/doc/${docId}`);
    })
  };
  return (
    <Button onClick={handleCreateNewDocument} disabled={isPending}>
      {isPending ? "Creating..." : "New Document"}
    </Button>
  )
}
export default NewDocumentButton
