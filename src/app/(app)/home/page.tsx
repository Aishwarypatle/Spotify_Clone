"use client";

import MusicCard from "@/components/music-card";
import { useMusic } from "@/context/MusicContext";
import { albums, artists } from "@/lib/data";

export default function HomePage() {
  const { playSong } = useMusic();

  const handlePlay = (item: any) => {
    if (item.songs && item.songs.length > 0) {
      playSong(item.songs[0]);
    } else if (item.name) {
      // Find first album by this artist and play its first song
      const artistAlbum = albums.find((a) => a.artist === item.name);
      if (artistAlbum && artistAlbum.songs.length > 0) {
        playSong(artistAlbum.songs[0]);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold font-headline mb-4">
          Good Afternoon
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {albums.slice(0, 4).map((album) => (
            <MusicCard
              key={album.id}
              item={{
                id: album.id,
                title: album.title,
                subtitle: album.artist,
                imageId: album.imageId,
              }}
              onPlay={() => handlePlay(album)}
            />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-3xl font-bold font-headline mb-4">
          Featured Albums
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {albums.map((album) => (
            <MusicCard
              key={album.id}
              item={{
                id: album.id,
                title: album.title,
                subtitle: album.artist,
                imageId: album.imageId,
              }}
              onPlay={() => handlePlay(album)}
            />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-3xl font-bold font-headline mb-4">Top Artists</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {artists.map((artist) => (
            <MusicCard
              key={artist.id}
              item={{
                id: artist.id,
                title: artist.name,
                subtitle: "Artist",
                imageId: artist.imageId,
              }}
              onPlay={() => handlePlay(artist)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
