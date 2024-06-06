"use client";
import { useGetSongById } from "@/apis/songs";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import React from "react";
import toast from "react-hot-toast";
import PlayerContent from "./PlayerContent";

const Player = () => {
  const player = usePlayer();
  const { data: song, isLoading, error } = useGetSongById(player.activeId);
  const songUrl = useLoadSongUrl(song);

  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  return (
    <div
      className="
    fixed
    bottom-0
    h-[80px]
    w-full
    bg-black
    px-4
    py-2
  "
    >
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
};

export default Player;
