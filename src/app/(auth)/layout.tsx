import { Music } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-8 left-8">
        <Link href="/home" className="flex items-center gap-2">
          <Music className="text-primary h-8 w-8" />
          <h1 className="text-2xl font-headline font-bold">HarmonyHub</h1>
        </Link>
      </div>
      {children}
    </div>
  );
}
