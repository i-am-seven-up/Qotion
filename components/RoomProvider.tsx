"use client";
import { ReactNode } from "react";
import {
    LiveblocksProvider,
    RoomProvider as RoomProviderWrapper,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { LiveList, LiveObject } from "@liveblocks/client"
import LoadingSpinner from "./LoadingSpinner";
import LiveCursorProvider from "./LiveCursorProvider";
import Document from "./ui/Document";

function RoomProvider({ children, roomId }: {
    children: ReactNode;
    roomId: string;
}) {
    try {
        return (
            <RoomProviderWrapper
                id={roomId}
                initialPresence={{
                    cursor: null,
                }}>
                <ClientSideSuspense fallback={<LoadingSpinner />}>
                    <LiveCursorProvider>
                        {children}
                    </LiveCursorProvider>
                </ClientSideSuspense>
            </RoomProviderWrapper>
        )
    } catch (e) {
        console.error("room provider error", e);
        return <div>error</div>
    }

}
export default RoomProvider