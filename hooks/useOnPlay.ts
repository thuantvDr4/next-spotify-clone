import { Song } from "@/typings";
import usePlayer from "./usePlayer";
import { useUser } from "./useUser";
import useAuthModal from "./useAuthModal";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const { user } = useUser();
  const authModal = useAuthModal();

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }
    player.setId(id);
    player.setIds(songs.map((item) => item.id));
  };
  return onPlay;
};

export default useOnPlay;
