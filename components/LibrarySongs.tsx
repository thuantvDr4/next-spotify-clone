import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/typings";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";

type LibrarySongsProps = {
  songs: Song[];
};

const LibrarySongs: React.FC<LibrarySongsProps> = ({ songs }) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const onPlay = useOnPlay(songs);

  const onAdd = () => {
    if (!user) {
      authModal.onOpen();
      return;
    }

    uploadModal.onOpen();
  };

  return (
    <div
      className="
  flex
  flex-col
  space-y-2
  p-2
  "
    >
      <div
        className="
    flex
    flex-row
    items-center
    justify-between
    mt-4
    "
      >
        <div
          className="
        inline-flex
        items-center
        space-x-2
        "
        >
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-neutral-400">Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={onAdd}
          size={20}
          className="
        hover:text-white
         text-neutral-400
         transition
         cursor-pointer
        "
        />
      </div>

      <div className="mt-4 px-2 flex flex-col">List of songs</div>
      <div
        className="
        flex
        flex-col
        space-y-2
        mt-4
        px-3
      "
      >
        {songs.map((item) => (
          <MediaItem key={item?.id} data={item} onClick={(id) => onPlay(id)} />
        ))}
      </div>
    </div>
  );
};

export default LibrarySongs;
