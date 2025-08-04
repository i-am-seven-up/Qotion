import * as Y from "yjs";
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
import { Input } from "./ui/input";
import { BotIcon, MessageCircleCode } from "lucide-react";
import { toast } from "sonner";
import Markdown from "react-markdown";

function ChatToDocument({ doc }: { doc: Y.Doc }) {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleAskQuestion = async (e: FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const documentData = doc.get("document-store").toJSON();

      try {
        var res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/chatToDocument`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              documentData,
              question,
            }),
          }
        );

        if (res.ok) {
          const { message } = await res.json();
          setQuestion(""); 
          setAnswer(message);
          toast.success("OK 200")
        }
      } catch (e) {
        const message = e instanceof Error ? e.message : "Something went wrong";
        toast.error(message);
      }
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline">
        <DialogTrigger>
          <MessageCircleCode />
          Chat to Document
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chat</DialogTitle>
          <DialogDescription>Ask AI about your current document content</DialogDescription>
          <hr className="mt-5" />

          {question && <p className="mt-5 text-gray-500">Q: {question}</p>}

          {(isPending || answer) && (
            <div className="bg-slate-100 p-2 rounded">
              <p className="flex gap-2 items-center">
                <BotIcon />{" "}
                <p className="font-semibold">
                  {isPending ? "Thinking..." : "Says: "}
                </p>
              </p>
              <Markdown>{answer}</Markdown>
            </div>
          )}
        </DialogHeader>

        <form className="flex gap-2">
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Button
            type="submit"
            disabled={isPending}
            onClick={handleAskQuestion}
          >
            {isPending ? "Asking..." : "Ask"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default ChatToDocument;
