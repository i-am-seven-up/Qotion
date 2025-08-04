import { ReactNode } from "react"
import { Toaster } from "sonner"

function ClientWrapper({children} : {children: ReactNode}) {
  return (
    <>
        <Toaster/>
        {children}
    </>
  )
}
export default ClientWrapper