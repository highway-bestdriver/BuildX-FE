import { create } from "zustand";

export type TrainingMetrics = {
  epoch: number;
  train_acc: number;
  train_loss: number;
  test_acc: number;
  test_loss: number;
  test_precision: number;
  test_recall: number;
  test_f1: number;
};

interface ResultState {
  trainingMetrics: TrainingMetrics | null;
  setTrainingMetrics: (metrics: TrainingMetrics) => void;
}

export const useResultStore = create<ResultState>((set) => ({
  trainingMetrics: null,
  setTrainingMetrics: (metrics) => set({ trainingMetrics: metrics }),
}));
