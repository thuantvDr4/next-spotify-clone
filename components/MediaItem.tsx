"use client";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/typings";
import Image from "next/image";
import React from "react";

type MediaItemProps = {
  data: Song;
  onClick?: (id: string) => void;
};

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
  const imageUrl = useLoadImage(data);
  const handleClick = () => {
    if (onClick) {
      return onClick(data?.id);
    }
    // TODO: default turn on player
  };

  return (
    <div
      onClick={handleClick}
      className="
        flex
        p-2
        items-center
        rounded-md
        w-auto
        hover:bg-neutral-800/50
        gap-x-3
        cursor-pointer
      
  "
    >
      <div
        className="
            relative
            min-h-[48px]
            min-w-[48px]
            rounded-md
            overflow-hidden
        "
      >
        <Image
          src={imageUrl || "/images/liked.png"}
          alt="media-item"
          fill
          className="object-cover object-center"
        />
      </div>
      <div>
        <p className="font-medium truncate">{data?.title || ""}</p>
        <p className="text-sm text-neutral-400">{data?.author || ""}</p>
      </div>
    </div>
  );
};

export default MediaItem;
