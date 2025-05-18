import { create } from "zustand";
import { persist } from "zustand/middleware";

// 전처리 블록
export type PreprocessingBlock = {
  type: string;
  [key: string]: string | undefined;
};

// 레이어 블록
export type LayerBlock = {
  uuid: string; // 드래그 관리용 내부 ID
  id: string; // 사용자 입력 ID
  type: string;
  input?: string;
  x?: number;
  y?: number;
  //[key: string]: string | undefined;
};

// 블록 간 연결선
export type Connection = {
  fromId: string; // input 블록 id
  toId: string; // 현재 블록 uuid
};

// 전체 모델 정보 저장
export interface ModelState {
  modelName: string;
  datasetName: string;
  // preprocessing: Record<string, Record<string, string>>;
  preprocessing: PreprocessingBlock[];
  hyperparameters: {
    epochs: string;
    batch_size: string;
    learning_rate: string;
  };
  layers: LayerBlock[];
  connections: Connection[];

  setModelName: (name: string) => void;
  setDatasetName: (name: string) => void;
  setPreprocessing: (pre: PreprocessingBlock[]) => void;
  setHyperparameters: (params: ModelState["hyperparameters"]) => void;

  updateLayer: (layer: LayerBlock) => void;
  getLayerByUUID: (uuid: string) => LayerBlock | undefined;
  removeLayer: (uuid: string) => void;

  addConnection: (fromId: string, toId: string) => void;
  removeConnection: (toId: string) => void;
}

export const useModelStore = create<ModelState>()(
  persist(
    (set, get) => ({
      modelName: "",
      datasetName: "",
      preprocessing: [],
      hyperparameters: {
        epochs: "",
        batch_size: "",
        learning_rate: "",
      },
      layers: [],
      connections: [],

      setModelName: (name) => set({ modelName: name }),
      setDatasetName: (name) => set({ datasetName: name }),
      setPreprocessing: (pre) => set({ preprocessing: pre }),
      setHyperparameters: (params) => set({ hyperparameters: params }),
      updateLayer: (newLayer) =>
        set((state) => {
          const existing = state.layers.find((l) => l.uuid === newLayer.uuid);
          const filtered = state.layers.filter((l) => l.uuid !== newLayer.uuid);
          //return { layers: [...filtered, newLayer] };
          return {
            layers: [...filtered, { ...existing, ...newLayer }],
          };
        }),

      getLayerByUUID: (uuid) => {
        return get().layers.find((l) => l.uuid === uuid);
      },

      removeLayer: (uuid) =>
        set((state) => ({
          layers: state.layers.filter((l) => l.uuid !== uuid),
        })),

      addConnection: (fromId, toId) =>
        set((state) => ({
          connections: [...state.connections, { fromId, toId }],
        })),
      removeConnection: (toId) =>
        set((state) => ({
          connections: state.connections.filter((c) => c.toId !== toId),
        })),
    }),
    {
      name: "model-storage",
      skipHydration: true,
    }
  )
);
