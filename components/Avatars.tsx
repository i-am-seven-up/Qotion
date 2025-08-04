import { useOthers, useSelf } from "@liveblocks/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function Avatars() {
  const self = useSelf();
  const others = useOthers();
  const all = [self, ...others];

  return (
    <div className="flex gap-3 items-center">
      <p style={{ fontSize: "15px" }}>Users currently editing this document</p>
      <div className="flex -space-x-5">
        {all.map((user, i) => (
            <TooltipProvider  key={user?.info.email}>
<Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="avatar border-2 hover:z-50">
                <AvatarImage src={user?.info.avatar} />
                <AvatarFallback>{i}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{i === 0 ? `You (${user?.info.name})` : user?.info.name}</p>
            </TooltipContent>
          </Tooltip>
            </TooltipProvider>
          
        ))}
      </div>
    </div>
  );
}
export default Avatars;
