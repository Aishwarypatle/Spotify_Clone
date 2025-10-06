"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  Library,
  Plus,
  Music,
  User,
  LogIn,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { playlists } from "@/lib/data";
import { cn } from "@/lib/utils";

const AppSidebar = () => {
  const pathname = usePathname();

  const navLinks = [
    { href: "/home", icon: Home, label: "Home" },
    { href: "/search", icon: Search, label: "Search" },
    { href: "/recommendations", icon: Sparkles, label: "For You" },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-card/40 p-2 flex flex-col space-y-2">
      <div className="p-4">
        <Link href="/home" className="flex items-center gap-2">
          <Music className="text-primary h-8 w-8" />
          <h1 className="text-2xl font-headline font-bold">HarmonyHub</h1>
        </Link>
      </div>

      <nav className="flex flex-col space-y-1 px-2">
        {navLinks.map((link) => (
          <Button
            key={link.href}
            variant={pathname === link.href ? "secondary" : "ghost"}
            className="justify-start"
            asChild
          >
            <Link href={link.href}>
              <link.icon className="mr-2 h-5 w-5" />
              <span className="font-semibold">{link.label}</span>
            </Link>
          </Button>
        ))}
      </nav>

      <div className="flex-grow flex flex-col px-2 mt-4">
        <div className="flex items-center justify-between mb-2">
          <Button variant="ghost" className="justify-start p-2">
            <Library className="mr-2 h-5 w-5" />
            <span className="font-semibold">Your Library</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-grow overflow-y-auto space-y-1">
          {playlists.map((playlist) => (
            <Button
              key={playlist.id}
              variant="ghost"
              className="w-full justify-start text-muted-foreground"
            >
              {playlist.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="border-t p-2">
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/login">
            <User className="mr-2 h-5 w-5" />
            <span className="font-semibold">Jane Doe</span>
          </Link>
        </Button>
      </div>
    </aside>
  );
};

export default AppSidebar;
