"use client";
import React, { useEffect, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import useSound from "use-sound";

import { Song } from "@/typings";
import Slider from "./Slider";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import usePlayer from "@/hooks/usePlayer";

type PlayerContentProps = {
  song: Song;
  songUrl: string;
};

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNextSong = () => {
    if (player.ids.length === 0) {
      return;
    }
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];
    if (!nextSong) {
      return player.setId(player.ids[0]);
    }
    player.setId(nextSong);
  };

  const onPlayPreviousSong = () => {
    if (player.ids.length === 0) {
      return;
    }
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const prevSong = player.ids[currentIndex - 1];
    if (!prevSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }
    player.setId(prevSong);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNextSong();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  return (
    <div
      className="
        grid
        grid-cols-2
        md:grid-cols-3
        gap-4
        items-center
    "
    >
      {/* ---item-media */}
      <div
        className="
        flex
        w-full
        justify-start
      "
      >
        <MediaItem data={song} />
        <LikeButton songId={song.id} />
      </div>
      {/* --mobile-playpause- */}
      <div
        className="
        flex
        justify-end
        md:hidden
      "
      >
        <div
          onClick={() => {}}
          className="
        w-10
        h-10
        bg-white
        rounded-full
        p-1
        items-center
        justify-center
        flex
      "
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>
      {/* --web playpause- */}
      <div
        className="
        hidden
        md:flex
        items-center
        justify-center
        gap-x-6
        h-full
        w-full
        max-w-[722px]
      "
      >
        <AiFillStepBackward
          onClick={onPlayPreviousSong}
          size={30}
          className="
            text-neutral-400
            hover:text-white
            transition
            cursor-pointer
        "
        />
        <div
          onClick={handlePlay}
          className="
            w-10
            h-10
            p-1
            rounded-full
            bg-white
            flex
            items-center
            justify-center
        "
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          onClick={onPlayNextSong}
          size={30}
          className="
            text-neutral-400
            hover:text-white
            transition
            cursor-pointer
        "
        />
      </div>
      {/* --volume-- */}
      <div
        className="
            hidded
            md:flex
            w-full
            justify-end
            pr-2
        "
      >
        <div
          className="
                flex
                items-center
                gap-x-2 w-[120px]
            "
        >
          <VolumeIcon
            onClick={toggleMute}
            size={34}
            className="
                        text-white
                        cursor-pointer
                    "
          />
          <Slider value={volume} onChange={(val) => setVolume(val)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
