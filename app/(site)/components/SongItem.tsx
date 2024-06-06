"use client";
import React from "react";
import { Song } from "@/typings";
import Image from "next/image";
import useLoadImage from "@/hooks/useLoadImage";
import PlayButton from "@/components/PlayButton";

type SongItemProps = {
  data: Song;
  onClick: (id: string) => void;
};

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  const imagePath = useLoadImage(data);

  return (
    <div
      onClick={() => onClick(data.id)}
      className="
  border
  border-slate-800
  rounded-md
  hover:border-slate-500
  bg-neutral-400/5
  hover:bg-neutral-400/10
  p-2
  cursor-pointer
  transition
  overflow-hidden
  flex
  flex-col
  relative
  group
  "
    >
      <div
        className="
        relative
        aspect-square
        h-full
        w-full
        rounded-md
        overflow-hidden
        "
      >
        <Image
          src={imagePath || "/images/liked.png"}
          fill
          alt="image"
          className="object-center object-cover"
        />
      </div>
      <div
        className="
        p-3
        flex
        flex-col
        w-full
        items-start
        space-y-1
        mt-4
      "
      >
        <p className="text-neutral-100 font-semibold text-sm truncate">
          {data?.title}
        </p>
        <p className="text-neutral-400 text-sm truncate">by {data?.author}</p>
      </div>

      <div
        className="
        absolute
        bottom-[80px]
        right-4
      "
      >
        <PlayButton onClick={() => console.log("----", data?.id)} />
      </div>
    </div>
  );
};

export default SongItem;
