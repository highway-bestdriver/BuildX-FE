import { create } from "zustand";

type Layer = {
  id: string;
  type: string;
  config: Record<string, any>;
};

interface BuildState {
  datasetName: string | null;
  modelName: string | null;
  layers: Layer[];
  addLayer: (layer: Layer) => void;
  updateLayerConfig: (id: string, config: Record<string, any>) => void;
}

export const useBuildStore = create<BuildState>((set) => ({
  datasetName: null,
  modelName: null,
  layers: [],
  addLayer: (layer) =>
    set((state) => ({
      layers: [...state.layers, layer],
    })),
  updateLayerConfig: (id, config) =>
    set((state) => ({
      layers: state.layers.map((layer) =>
        layer.id === id ? { ...layer, config } : layer
      ),
    })),
}));
