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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parsedPreprocessing: Record<string, any> = {};
    Object.entries(preprocessing).forEach(([method, params]) => {
      parsedPreprocessing[method] = {};
      Object.entries(params).forEach(([k, v]) => {
        try {
          parsedPreprocessing[method][k] = JSON.parse(v);
        } catch {
          parsedPreprocessing[method][k] = v;
        }
      });
    });

    // layers 변환 (uuid 제외)
    const parsedLayers = layers.map(({ ...rest }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const parsed: Record<string, any> = {};
      Object.entries(rest).forEach(([key, val]) => {
        try {
          parsed[key] = JSON.parse(val!);
        } catch {
          parsed[key] = val;
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
