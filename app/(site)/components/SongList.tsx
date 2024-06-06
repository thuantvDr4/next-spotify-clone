"use client";
import { Song } from "@/typings";
import React from "react";
import SongItem from "./SongItem";
import useOnPlay from "@/hooks/useOnPlay";

type SongListProps = {
  songs: Song[];
};

const SongList: React.FC<SongListProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return <div className="text-neutral-400 mt-4">No songs available.</div>;
  }

  return (
    <div
      className="
      w-full
      grid
      grid-cols-2
      sm:grid-cols-3
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
      2xl:grid-cols-8
      gap-4
      mt-4
  "
    >
      {songs.map((item) => (
        <SongItem
          key={item.id}
          data={item}
          onClick={(id: string) => onPlay(id)}
        />
      ))}
    </div>
  );
};

export default SongList;
