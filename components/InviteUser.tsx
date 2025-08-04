import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormEvent, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";

import { addNewCollaborator, deleteDocument } from "@/actions/actions";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { adminDb } from "@/firebase-admin";
import { useRoom } from "@liveblocks/react";
import { create } from "domain";

function InviteUser() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const room = useRoom();

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const { success } = await addNewCollaborator(room.id, email);

      if (success) {
        toast.success(`Invited ${email} successfully`);
      } else {
        toast.error(`Error invited ${email}`);
      }
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline">
        <DialogTrigger>Invite</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite collaborator</DialogTitle>
          <DialogDescription>
            Enter an email to invite your buddy and share this space!
          </DialogDescription>
        </DialogHeader>

        <form className="flex gap-2">
          <Input
            type="input"
            placeholder="Email here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" onClick={handleDelete}>
            {isPending ? "Inviting..." : "Invite"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default InviteUser;
