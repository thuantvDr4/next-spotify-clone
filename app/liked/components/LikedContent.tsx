"use client";
import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/typings";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type LikedContentProps = {
  songs: Song[];
};

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const onPlay = useOnPlay(songs);

  useEffect(() => {
    if (!isLoading && !user?.id) {
      return router.replace("/");
    }
  }, [router, user, isLoading]);

  if (songs.length === 0) {
    return (
      <div className="text-neutral-400 gap-y-4 w-full px-6">No liked songs</div>
    );
  }

  return (
    <div
      className="
    flex flex-col
    gap-y-2
    p-6
  "
    >
      {songs.map((song) => (
        <div key={song.id} className="flex flex-row items-center space-x-4">
          <div className="flex-1">
            <MediaItem data={song} onClick={(id) => onPlay(id)} />
          </div>
          <LikeButton songId={song?.id} />
        </div>
      ))}
    </div>
  );
};

export default LikedContent;
