import ClientAuth from "@/lib/check"
import { ReactNode } from "react"
import { Toaster } from "sonner"

function ClientWrapper({children} : {children: ReactNode}) {
  return (
    <>
        <Toaster/>
        <ClientAuth/>
        {children}
    </>
  )
}
export default ClientWrapper