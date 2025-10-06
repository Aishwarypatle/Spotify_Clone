"use client";

import { useState } from "react";
import MusicCard from "@/components/music-card";
import { Input } from "@/components/ui/input";
import { useMusic } from "@/context/MusicContext";
import { albums, artists, songs, Song } from "@/lib/data";
import { SearchIcon } from "lucide-react";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { playSong } = useMusic();

  const handlePlay = (item: any) => {
    if (item.songs && item.songs.length > 0) {
      playSong(item.songs[0]);
    } else if (item.title && item.artist) { // It's a song
      playSong(item);
    } else if (item.name) { // it's an artist
      // Find first album by this artist and play its first song
      const artistAlbum = albums.find((a) => a.artist === item.name);
      if (artistAlbum && artistAlbum.songs.length > 0) {
        playSong(artistAlbum.songs[0]);
      }
    }
  };

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAlbums = albums.filter(
    (album) =>
      album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      album.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search for songs, albums, or artists"
          className="w-full max-w-lg pl-10 text-lg py-6"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {searchTerm && (
        <>
          {filteredSongs.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold font-headline mb-4">Songs</h2>
              <div className="flex flex-col gap-2">
                {filteredSongs.map((song) => (
                   <button key={song.id} onClick={() => handlePlay(song)} className="text-left p-2 rounded-md hover:bg-secondary">
                    <p className="font-semibold">{song.title}</p>
                    <p className="text-sm text-muted-foreground">{song.artist}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredAlbums.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold font-headline mb-4">Albums</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredAlbums.map((album) => (
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
          )}

          {filteredArtists.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold font-headline mb-4">
                Artists
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredArtists.map((artist) => (
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
          )}
        </>
      )}
    </div>
  );
}
