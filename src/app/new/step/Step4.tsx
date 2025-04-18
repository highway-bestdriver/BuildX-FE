"use client";

import { useState } from "react";
import { useModelStore } from "@store/useModelStore";
import { modelApi } from "@api/client/model";

const Step4 = () => {
  const {
    modelName,
    datasetName,
    layers,
    preprocessing,
    hyperparameters,
    setHyperparameters,
  } = useModelStore();

  const [epoch, setEpoch] = useState("");
  const [batchSize, setBatchSize] = useState("");
  const [learningRate, setLearningRate] = useState("");

  const [generatedCode, setGeneratedCode] = useState("");

  const handleComplete = () => {
    setHyperparameters({
      epochs: epoch,
      batch_size: batchSize,
      learning_rate: learningRate,
    });
  };

  const handleGenerateCode = async () => {
    try {
      // 하이퍼파라미터를 숫자로 변환
      const parsedHyper = {
        epochs: Number(hyperparameters.epochs),
        batch_size: Number(hyperparameters.batch_size),
        learning_rate: Number(hyperparameters.learning_rate),
      };

      // 전처리값도 변환
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
      const parsedLayers = layers.map(({ uuid, ...rest }) => {
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

      const body = {
        model_name: modelName,
        dataset: datasetName,
        layers: parsedLayers,
        preprocessing: parsedPreprocessing,
        hyperparameters: parsedHyper,
      };

      console.log("보내는 body:", JSON.stringify(body, null, 2));
      const res = await modelApi.generateCode(body);
      setGeneratedCode(res.code);
      console.log("response: " + res);
      console.log("generatedCode: " + res.code);
    } catch (error) {
      console.error("코드 생성 실패: ", error);
      alert("코드 생성에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col w-full items-center  px-4 py-6 mt-12">
      <article className="flex w-[90%] flex-row justify-between">
        <div className="p-4 text-gray-600 suit_16_M flex flex-col gap-4">
          <p>- 데이터셋: {datasetName}</p>
          <p>- 모델명: {modelName}</p>
          <p>- 레이어 수: {layers.length}</p>
        </div>

        {/* 고급 설정 */}
        <div className="suit_16_M flex flex-col bg-white p-4 rounded-xl gap-4">
          <div className="suit_16_B text-lg">고급</div>
          <span className="flex flex-row justify-between items-center gap-2">
            <span>에포크: </span>
            <input
              className="flex-1 suit_16_R border-0 border-b border-main_black pb-1"
              value={epoch}
              onChange={(e) => setEpoch(e.target.value)}
            />
          </span>
          <span className="flex flex-row justify-between items-center gap-2">
            <span>배치 크기: </span>
            <input
              className="flex-1 suit_16_R border-0 border-b border-main_black pb-1"
              value={batchSize}
              onChange={(e) => setBatchSize(e.target.value)}
            />
          </span>
          <span className="flex flex-row justify-between items-center gap-2">
            <span>학습률: </span>
            <input
              className="flex-1 suit_16_R border-0 border-b border-main_black pb-1"
              value={learningRate}
              onChange={(e) => setLearningRate(e.target.value)}
            />
          </span>
          <div className="flex justify-center mt-6">
            <span
              onClick={handleComplete}
              className="px-4 py-2 text-lg suit_16_SB bg-gray-400 text-white rounded-lg hover:bg-gray-500 cursor-pointer"
            >
              Complete
            </span>
          </div>
        </div>
      </article>

      <div className="mt-12" />
      <div
        onClick={handleGenerateCode}
        className="px-6 py-2 inline-block text-2xl suit_16_B bg-main_orange text-black hover:bg-orange-400 cursor-pointer border-[8px] rounded-[20px]"
      >
        코드 생성
      </div>
    </div>
  );
};

export default Step4;
