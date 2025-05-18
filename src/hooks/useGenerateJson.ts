import { useModelStore } from "@store/useModelStore";
import { useResultStore } from "@store/useResultStore";

export const useGenerateJson = () => {
  const { modelName, datasetName, layers, preprocessing, hyperparameters } =
    useModelStore();
  const { trainingMetrics } = useResultStore();

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
        if (["uuid", "x", "y"].includes(key)) return;

        if (["id", "type", "input"].includes(key)) {
          parsed[key] = val; // 문자열로 유지
        } else {
          try {
            parsed[key] = typeof val === "string" ? JSON.parse(val) : val;
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

  // 피드백 요청용 body 생성 함수
  const getFeedbackRequestBody = () => {
    const model = getRequestBody();

    return {
      model,
      metrics: {
        epoch: trainingMetrics?.epoch ?? 0,
        train_acc: trainingMetrics?.train_acc ?? 0,
        train_loss: trainingMetrics?.train_loss ?? 0,
        test_acc: trainingMetrics?.test_acc ?? 0,
        test_loss: trainingMetrics?.test_loss ?? 0,
        test_precision: trainingMetrics?.test_precision ?? 0,
        test_recall: trainingMetrics?.test_recall ?? 0,
        test_f1: trainingMetrics?.test_f1 ?? 0,
      },
    };
  };

  return { getRequestBody, getFeedbackRequestBody };
};
