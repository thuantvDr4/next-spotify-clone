import React from "react";
import { FaPlay } from "react-icons/fa";

type PlayButtonProps = {
  onClick: () => void;
};

const PlayButton: React.FC<PlayButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        p-4
        bg-green-500
        rounded-full
        items-center
        justify-center
        flex
        drop-shadow-md
        translate
        translate-y-1/4
        opacity-0
        group-hover:opacity-100
        group-hover:translate-y-0
        hover:scale-110
        transition
    "
    >
      <FaPlay className="text-black" />
    </button>
  );
};

export default PlayButton;
