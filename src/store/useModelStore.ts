import { create } from "zustand";
import { persist } from "zustand/middleware";

// 각 레이어 블록 형식
export type LayerBlock = {
  uuid: string; // 드래그 위치 관리용 내부 ID
  id: string; // 사용자 입력 ID
  type: string;
  input?: string;
  [key: string]: string | undefined;
};

// 전체 모델 정보 저장
export interface ModelState {
  modelName: string;
  datasetName: string;
  preprocessing: Record<string, Record<string, string>>;
  hyperparameters: {
    epochs: string;
    batch_size: string;
    learning_rate: string;
  };
  layers: LayerBlock[];

  setModelName: (name: string) => void;
  setDatasetName: (name: string) => void;
  setPreprocessing: (pre: Record<string, Record<string, string>>) => void;
  setHyperparameters: (params: ModelState["hyperparameters"]) => void;

  updateLayer: (layer: LayerBlock) => void;
  getLayerByUUID: (uuid: string) => LayerBlock | undefined;
  removeLayer: (uuid: string) => void;
}

export const useModelStore = create<ModelState>()(
  persist(
    (set, get) => ({
      modelName: "",
      datasetName: "",
      preprocessing: {},
      hyperparameters: {
        epochs: "",
        batch_size: "",
        learning_rate: "",
      },
      layers: [],

      setModelName: (name) => set({ modelName: name }),
      setDatasetName: (name) => set({ datasetName: name }),
      setPreprocessing: (pre) => set({ preprocessing: pre }),
      setHyperparameters: (params) => set({ hyperparameters: params }),
      updateLayer: (newLayer) =>
        set((state) => {
          const filtered = state.layers.filter((l) => l.uuid !== newLayer.uuid);
          return { layers: [...filtered, newLayer] };
        }),

      getLayerByUUID: (uuid) => {
        return get().layers.find((l) => l.uuid === uuid);
      },

      removeLayer: (uuid) =>
        set((state) => ({
          layers: state.layers.filter((l) => l.uuid !== uuid),
        })),
    }),
    {
      name: "model-storage",
      skipHydration: true,
    }
  )
);
