"use client";

import Image from "next/image";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useMusic } from "@/context/MusicContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { getImageUrl, getImageHint } from "@/lib/data";
import { useEffect, useState } from "react";

const MusicPlayer = () => {
  const { currentSong, isPlaying, togglePlayPause, progress } = useMusic();
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (currentSong) {
      const audio = new Audio(currentSong.audioUrl);
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration);
      });
    }
  }, [currentSong]);
  

  if (!currentSong) {
    return (
      <footer className="h-24 bg-card/60 border-t backdrop-blur-sm flex items-center justify-center text-muted-foreground">
        Select a song to start playing.
      </footer>
    );
  }
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  const imageUrl = getImageUrl(currentSong.imageId);
  const imageHint = getImageHint(currentSong.imageId);
  const currentTime = (progress / 100) * duration;


  return (
    <footer className="h-24 bg-card/60 border-t backdrop-blur-sm p-4 flex items-center justify-between">
      <div className="flex items-center gap-4 w-1/4">
        <div className="relative h-16 w-16 rounded-md overflow-hidden">
          <Image
            src={imageUrl}
            alt={currentSong.album}
            fill
            className="object-cover"
            data-ai-hint={imageHint}
          />
        </div>
        <div>
          <p className="font-bold font-headline truncate">{currentSong.title}</p>
          <p className="text-sm text-muted-foreground">{currentSong.artist}</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 w-1/2 max-w-xl">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <SkipBack />
          </Button>
          <Button
            variant="default"
            size="icon"
            className="h-12 w-12 rounded-full bg-primary"
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <Pause className="fill-primary-foreground" />
            ) : (
              <Play className="fill-primary-foreground ml-1" />
            )}
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <SkipForward />
          </Button>
        </div>
        <div className="w-full flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-10 text-right">
            {formatTime(currentTime)}
          </span>
          <Progress value={progress} className="h-1" />
          <span className="text-xs text-muted-foreground w-10">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 w-1/4 justify-end">
        <Volume2 className="text-muted-foreground" />
        <Slider defaultValue={[70]} max={100} step={1} className="w-24" />
      </div>
    </footer>
  );
};

export default MusicPlayer;
