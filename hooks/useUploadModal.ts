import { create } from "zustand";

type UploadModalStore = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

const useUploadModal = create<UploadModalStore>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));

export default useUploadModal;
