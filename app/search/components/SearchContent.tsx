"use client";
import React from "react";
import { Song } from "@/typings";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";

type SearchContentProps = {
  songs: Song[];
};

const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);
  if (songs.length === 0) {
    return <div className="px-6 text-neutral-400">No songs found</div>;
  }
  return (
    <div
      className="
        px-6
        flex
        flex-col
        space-y-2
    "
    >
      {songs.map((song) => (
        <div
          key={song.id}
          className="
          flex 
          items-center 
          space-x-4 
          group
          hover:bg-neutral-800
          transparent
          transition
          rounded-md
          "
        >
          <div className="flex-1">
            <MediaItem data={song} onClick={(id: string) => onPlay(id)} />
          </div>
          <LikeButton songId={song?.id} />
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
