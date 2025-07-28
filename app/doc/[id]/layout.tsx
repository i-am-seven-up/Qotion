import ClientWrapper from "@/components/ClientWrapper";
import RoomProvider from "@/components/RoomProvider";
import { Toaster } from "@/components/ui/sonner";
import toastAlert from "@/components/ui/toast";
import ClientAuth from "@/lib/check";
import { auth } from "@clerk/nextjs/server";
import { ReactNode, useEffect, useState } from "react";

function DocLayout({ children, params: { id } }: { children: ReactNode, params: { id: string } }) {

    return (
        <ClientWrapper>
            <RoomProvider roomId={id}>
                {children}
            </RoomProvider>
        </ClientWrapper>
    )
}
export default DocLayout