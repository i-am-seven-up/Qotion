"use client";

import { LiveblocksProvider } from "@liveblocks/react/suspense";
import { ReactNode } from "react";

export function LiveBlocksProvider({ children }: { children: ReactNode }) {
    if (!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY) {
        throw new Error("NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY is not set");
    }
    return (
        <LiveblocksProvider authEndpoint={`/auth-endpoint`}>
            {children}
        </LiveblocksProvider>
    )
}