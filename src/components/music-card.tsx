"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getImageUrl, getImageHint } from "@/lib/data";

type MusicCardProps = {
  item: {
    id: string;
    title: string;
    subtitle: string;
    imageId: string;
  };
  onPlay: () => void;
};

const MusicCard = ({ item, onPlay }: MusicCardProps) => {
  const imageUrl = getImageUrl(item.imageId);
  const imageHint = getImageHint(item.imageId);

  return (
    <Card className="group relative overflow-hidden border-0 bg-secondary hover:bg-secondary/80 transition-colors duration-300">
      <CardContent className="p-4">
        <div className="relative aspect-square w-full mb-4 rounded-md overflow-hidden">
          <Image
            src={imageUrl}
            alt={item.title}
            fill
            className="object-cover"
            data-ai-hint={imageHint}
          />
        </div>
        <h3 className="font-headline font-bold truncate">{item.title}</h3>
        <p className="text-sm text-muted-foreground truncate">
          {item.subtitle}
        </p>
        <Button
          onClick={onPlay}
          size="icon"
          className="absolute bottom-20 right-6 h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg
                     opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out"
        >
          <Play className="h-6 w-6 fill-current ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default MusicCard;
