"use client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BotIcon, LanguagesIcon } from "lucide-react";
import { toast } from "sonner";
import { sum } from "firebase/firestore";
import Markdown from "react-markdown"; 

type Language =
  | "english"
  | "vietnamese"
  | "chinese"
  | "japanese"
  | "french"
  | "german"
  | "arabic"
  | "hindi";

const languages: Language[] = [
  "english",
  "vietnamese",
  "chinese",
  "japanese",
  "french",
  "german",
  "arabic",
  "hindi",
];

function TranslateDocument({ doc }: { doc: Y.Doc }) {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("");
  const [summary, setSummary] = useState("");
  const [question, setQuestion] = useState("");

  const [isPending, startTransition] = useTransition();
  const handleAskQuestion = (e: FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const documentData = doc.get("document-store").toJSON();
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              documentData,
              targetLang: language,
            }),
          }
        );

        if (res.ok) {
          const { translated_text } = await res.json();

          setSummary(translated_text);
          toast.success("Translated Summary successfully!");
        }
      } catch (e) {
        const message =
          e instanceof Error ? e.message : "Some thing went wrong";
        toast.error(message);
      }
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline">
        <DialogTrigger>
          <LanguagesIcon />
          Translate
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Translate & Summary the Document</DialogTitle>
          <DialogDescription>
            Select a Language and AI will translate the document into the
            selected language.
          </DialogDescription>

          <hr className="mt-5" />

          {question && <p className="mt-5 text-gray-500">Q: {question}</p>}

          {(isPending || summary) && (
            <div className="bg-slate-100 p-2 rounded">
              <p className="flex gap-2 items-center">
                <BotIcon />{" "}
                <p className="font-semibold">
                  {isPending ? "Thinking..." : "Says: "}
                </p>
              </p>
              <Markdown>{summary}</Markdown>
            </div>
          )}
        </DialogHeader>

        <form className="flex gap-2">
          <Select
            value={language}
            onValueChange={(value) => setLanguage(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language} value={language}>
                  {language.charAt(0).toUpperCase() + language.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            type="submit"
            disabled={!language || isPending}
            onClick={handleAskQuestion}
          >
            {isPending ? "Translating..." : "Translate"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TranslateDocument;
