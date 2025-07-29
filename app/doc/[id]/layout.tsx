import RoomProvider from "@/components/RoomProvider";
import { requireAuthOrThow } from "@/lib/auth/requireAuthOrThrow";
import { ReactNode } from "react";

function DocLayout({ children, params: { id } }: { children: ReactNode, params: { id: string } }) {
    
    // requireAuthOrThow();
 
    return (
        <RoomProvider roomId={id}>
            {children}
        </RoomProvider>
    )
}
export default DocLayout