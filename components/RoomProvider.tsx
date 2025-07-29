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

function RoomProvider({ children, roomId }: {
    children: ReactNode;
    roomId: string;
}) {
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
}
export default RoomProvider