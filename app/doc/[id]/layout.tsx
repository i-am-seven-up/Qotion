import ClientWrapper from "@/components/ClientWrapper";
import RoomProvider from "@/components/RoomProvider";
import { Toaster } from "@/components/ui/sonner";
import toastAlert from "@/components/ui/toast";
import { requireAuthOrThow } from "@/lib/auth/requireAuthOrThrow";
import { auth } from "@clerk/nextjs/server";
import { ReactNode, useEffect, useState } from "react";

function DocLayout({ children, params: { id } }: { children: ReactNode, params: { id: string } }) {
    // TODO: protect endpoint here
    const userId = requireAuthOrThow();
    // if (userId != null) {
    //     toastAlert({ title: "Ok", message: "200" });
    // }
    return (<>
        <RoomProvider roomId={id}>
            {children}
        </RoomProvider></>
    )
}
export default DocLayout