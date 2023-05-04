import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={cn(inter.className)}>
      <h1>Hello world</h1>
    </main>
  );
}
