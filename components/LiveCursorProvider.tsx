"use client";
import { PointerEvent, ReactNode } from "react";

import { useMyPresence, useOthers } from "@liveblocks/react/suspense"
import FollowPointer from "./FollowPointer";

function LiveCursorProvider({ children }: { children: ReactNode }) {
    const [myPresence, updateMyPresence] = useMyPresence();
    const others = useOthers();

    function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
        const cursor = { x: Math.floor(e.pageX), y: Math.floor(e.pageY) };
        updateMyPresence({ cursor });
    }
    function handlePointerLeave(e: PointerEvent<HTMLDivElement>) {
        const cursor = null;
        updateMyPresence({ cursor });
    }
    return (
        <div onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}>
            {
                others.filter((other) => other.presence.cursor !== null)
                    .map(({ connectionId, presence, info }) => (
                        <FollowPointer
                            key={connectionId}
                            info={info}
                            x={presence.cursor!.x} 
                            y={presence.cursor!.y}/>
                    ))
            }
        </div>
    )
}
export default LiveCursorProvider