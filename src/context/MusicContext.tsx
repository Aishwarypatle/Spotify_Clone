"use client";

import type { Song } from "@/lib/data";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";

interface MusicContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  playSong: (song: Song) => void;
  togglePlayPause: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();

    const audio = audioRef.current;

    const setAudioData = () => {
      if (audio) {
        const duration = audio.duration;
        if (duration) {
          // The duration has been updated, you can use it
        }
      }
    };
    
    const setAudioTime = () => {
      if (audio) {
         setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);

    audio.onended = () => {
      setIsPlaying(false);
      setProgress(100);
    }

    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
      audio.pause();
    };

  }, []);

  const playSong = (song: Song) => {
    if (audioRef.current) {
      if (currentSong?.id !== song.id) {
        setCurrentSong(song);
        audioRef.current.src = song.audioUrl;
        setProgress(0);
      }
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    if (currentSong && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };


  return (
    <MusicContext.Provider
      value={{ currentSong, isPlaying, progress, playSong, togglePlayPause }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
};
