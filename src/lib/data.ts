import { PlaceHolderImages } from "./placeholder-images";

export type Song = {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  imageId: string;
  audioUrl: string;
};

export type Artist = {
  id:string;
  name: string;
  imageId: string;
};

export type Album = {
  id: string;
  title: string;
  artist: string;
  imageId: string;
  songs: Song[];
};

export type Playlist = {
  id: string;
  name: string;
  songCount: number;
};

export const artists: Artist[] = [
  { id: "artist-1", name: "Echoes of Orion", imageId: "artist-1" },
  { id: "artist-2", name: "Luna Bloom", imageId: "artist-2" },
  { id: "artist-3", name: "Solaris", imageId: "artist-3" },
  { id: "artist-4", name: "The Wandering Souls", imageId: "artist-4" },
];

export const albums: Album[] = [
  {
    id: "album-1",
    title: "Cosmic Drift",
    artist: "Echoes of Orion",
    imageId: "album-1",
    songs: [
      {
        id: "song-1",
        title: "Starlight Serenade",
        artist: "Echoes of Orion",
        album: "Cosmic Drift",
        duration: "3:45",
        imageId: "album-1",
        audioUrl: 'https://storage.googleapis.com/ci-v2-dev-central-0-1234-app-assets-us-central1/Starlight_Serenade.mp3'
      },
      {
        id: "song-2",
        title: "Nebula Dreams",
        artist: "Echoes of Orion",
        album: "Cosmic Drift",
        duration: "4:12",
        imageId: "album-1",
        audioUrl: 'https://storage.googleapis.com/ci-v2-dev-central-0-1234-app-assets-us-central1/Nebula_Dreams.mp3'
      },
    ],
  },
  {
    id: "album-2",
    title: "Midnight Garden",
    artist: "Luna Bloom",
    imageId: "album-2",
    songs: [
      {
        id: "song-3",
        title: "Moonpetal",
        artist: "Luna Bloom",
        album: "Midnight Garden",
        duration: "2:58",
        imageId: "album-2",
        audioUrl: 'https://storage.googleapis.com/ci-v2-dev-central-0-1234-app-assets-us-central1/Moonpetal.mp3'
      },
    ],
  },
  {
    id: "album-3",
    title: "Chasing the Sun",
    artist: "Solaris",
    imageId: "album-3",
    songs: [
      {
        id: "song-4",
        title: "First Light",
        artist: "Solaris",
        album: "Chasing the Sun",
        duration: "5:02",
        imageId: "album-3",
        audioUrl: 'https://storage.googleapis.com/ci-v2-dev-central-0-1234-app-assets-us-central1/First_Light.mp3'
      },
    ],
  },
  {
    id: "album-4",
    title: "Faded Photographs",
    artist: "The Wandering Souls",
    imageId: "album-4",
    songs: [
      {
        id: "song-5",
        title: "Dusty Roads",
        artist: "The Wandering Souls",
        album: "Faded Photographs",
        duration: "3:15",
        imageId: "album-4",
        audioUrl: 'https://storage.googleapis.com/ci-v2-dev-central-0-1234-app-assets-us-central1/Dusty_Roads.mp3'
      },
    ],
  },
    {
    id: "album-5",
    title: "Retrograde",
    artist: "Echoes of Orion",
    imageId: "album-5",
    songs: [],
  },
  {
    id: "album-6",
    title: "Wildfire",
    artist: "The Wandering Souls",
    imageId: "album-6",
    songs: [],
  },
];

export const songs: Song[] = albums.flatMap((album) => album.songs);

export const playlists: Playlist[] = [
  { id: "pl-1", name: "Chill Vibes", songCount: 12 },
  { id: "pl-2", name: "Workout Hits", songCount: 25 },
  { id: "pl-3", name: "Late Night Study", songCount: 42 },
  { id: "pl-4", name: "Road Trip Anthems", songCount: 50 },
];

export function getImageUrl(id: string) {
  const image = PlaceHolderImages.find((img) => img.id === id);
  return image ? image.imageUrl : "https://picsum.photos/seed/placeholder/400/400";
}

export function getImageHint(id: string) {
    const image = PlaceHolderImages.find((img) => img.id === id);
    return image ? image.imageHint : "placeholder image";
}
