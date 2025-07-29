"use client";

import Document from "@/components/ui/Document";

function DocumentPage({ params: { id } }: {
  params: {
    id: string;
  };
}) {
  return (
    <Document id={id}/>
  )
}
export default DocumentPage