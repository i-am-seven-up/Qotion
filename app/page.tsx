import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>let's build an api productivity app</h1>
      <Button>Click me</Button>
    </main>
  );
}
