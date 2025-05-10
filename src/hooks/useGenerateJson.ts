import { useModelStore } from "@store/useModelStore";

export const useGenerateJson = () => {
  const { modelName, datasetName, layers, preprocessing, hyperparameters } =
    useModelStore();

  const getRequestBody = () => {
    // 하이퍼파라미터를 숫자로 변환
    const parsedHyper = {
      epochs: Number(hyperparameters.epochs),
      batch_size: Number(hyperparameters.batch_size),
      learning_rate: Number(hyperparameters.learning_rate),
    };

    // 전처리값을 숫자로 변환
    const parsedPreprocessing = preprocessing.map((block) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const parsed: Record<string, any> = { type: block.type };
      Object.entries(block).forEach(([key, val]) => {
        if (key === "type") return;
        try {
          parsed[key] = JSON.parse(val!);
        } catch {
          parsed[key] = val;
        }
      });
      return parsed;
    });

    // layers 변환 (uuid 제외)
    const parsedLayers = layers.map((layer) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const parsed: Record<string, any> = {};

      Object.entries(layer).forEach(([key, val]) => {
        if (["uuid", "id", "type"].includes(key)) {
          parsed[key] = val;
        } else if (key === "input" && layer.type === "Sequential") {
          // Skip input for Sequential
          return;
        } else if (key === "input") {
          parsed[key] = val;
        } else {
          try {
            parsed[key] = JSON.parse(val!);
          } catch {
            parsed[key] = val;
          }
        }
      });

      return parsed;
    });

    return {
      model_name: modelName,
      dataset: datasetName,
      layers: parsedLayers,
      preprocessing: parsedPreprocessing,
      hyperparameters: parsedHyper,
    };
  };

  return { getRequestBody };
};
