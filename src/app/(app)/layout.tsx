import AppSidebar from "@/components/app-sidebar";
import MusicPlayer from "@/components/music-player";
import { MusicProvider } from "@/context/MusicContext";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MusicProvider>
      <div className="relative flex h-screen w-full flex-col bg-background overflow-hidden">
        <div className="flex flex-1 overflow-hidden">
          <AppSidebar />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
        <MusicPlayer />
      </div>
    </MusicProvider>
  );
}
