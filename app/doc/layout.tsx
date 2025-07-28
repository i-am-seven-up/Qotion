import { LiveBlocksProvider } from "@/components/ui/LiveBlocksProvider"
import { ReactNode } from "react"
import { Toaster } from "sonner"

function PageLayout({ children }: { children: ReactNode }) {
  return (<>
    <LiveBlocksProvider>{children}</LiveBlocksProvider>
  </>
  )
}
export default PageLayout