import { LiveBlocksProvider } from "@/components/ui/LiveBlocksProvider"
import { ReactNode } from "react"

function PageLayout({ children }: { children: ReactNode }) {
  return <LiveBlocksProvider>{children}</LiveBlocksProvider>
}
export default PageLayout