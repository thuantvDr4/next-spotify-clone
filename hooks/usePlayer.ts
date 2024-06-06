import { create } from "zustand";

interface PlayerStore {
  activeId?: string;
  ids: string[];
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  setId: (id) => set({ activeId: id }),
  setIds: (_ids) => set({ ids: _ids }),
  reset: () => set({ ids: [], activeId: undefined }),
}));

export default usePlayer;
