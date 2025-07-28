import { Button } from "@/components/ui/button";
import { ArrowLeftCircle } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex-1 flex items-center p-2 overflow-y-auto scrollbar-hide animate-pulse gap-5">
      <ArrowLeftCircle className="w-7 h-7"/>
      <h1 className="font-bold">Get started with creating a New Document</h1>
    </main>
  );
}
