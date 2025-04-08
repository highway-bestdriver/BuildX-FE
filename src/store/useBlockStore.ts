import { create } from "zustand";

export type BlockSetting = {
  id: string;
  type: string;
  input?: string;
  params: Record<string, string>;
};

interface BlockStoreState {
  blockSettings: Record<string, BlockSetting>;
  setBlockSetting: (blockUUID: string, setting: BlockSetting) => void;
  getBlockSetting: (blockUUID: string) => BlockSetting | undefined;
}

export const useBlockStore = create<BlockStoreState>((set, get) => ({
  blockSettings: {},
  setBlockSetting: (uuid, setting) =>
    set((state) => ({
      blockSettings: { ...state.blockSettings, [uuid]: setting },
    })),
  getBlockSetting: (uuid) => get().blockSettings[uuid],
}));
