import getLikedSongs from "@/actions/getLikedSongs";
import Header from "@/components/Header";
import Image from "next/image";
import React from "react";
import LikedContent from "./components/LikedContent";

export const revalidate = 0;

const LikePage = async () => {
  const songs = await getLikedSongs();

  return (
    <div
      className="
    bg-neutral-900
    rounded-lg
    overflow-hidden
    overflow-y-auto
    h-full
    w-full
  "
    >
      <Header>
        <div
          className="
            mt-20
        "
        >
          <div
            className="
           flex
           flex-col
           md:flex-row
           md:items-center
            gap-x-4
        "
          >
            <div
              className="
             relative
             h-32
             w-32
             lg:h-44
             lg:w-44
            "
            >
              <Image
                src={"/images/liked.png"}
                fill
                alt="image"
                className="object-center object-cover"
              />
            </div>

            {/* --title-- */}
            <div
              className="
                flex flex-col
                space-y-2
                mt-4
                md:mt-0
          "
            >
              <p className="hidden md:block font-semibold text-sm text-neutral-400">
                Playlist
              </p>
              <h1
                className="
                text-white
                text-4xl
                sm:text-5xl
                lg:text-7xl
                font-bold
            "
              >
                Liked Songs
              </h1>
            </div>
          </div>
        </div>
      </Header>
      {/* ---list-- */}
      <LikedContent songs={songs} />
    </div>
  );
};

export default LikePage;
