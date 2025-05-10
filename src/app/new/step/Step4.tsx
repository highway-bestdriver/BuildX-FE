"use client";

import { useState } from "react";
import { useModelStore } from "@store/useModelStore";
import { modelApi } from "@api/client/model";
import { useGenerateJson } from "src/hooks/useGenerateJson";
import { token } from "@api/token";

import LoadingSpinner from "./_components/(train)/LoadingSpinner";
import CodeViewer from "./_components/(train)/CodeViewer";
import HyperparamForm from "./_components/(train)/HyperparamForm";
import TrainingGraph from "./_components/(train)/TrainingGraph";
import { useResultStore } from "@store/useResultStore";
import EpochProgressBar from "./_components/(train)/EpochProgressBar";

const Step4 = () => {
  const { modelName, datasetName, layers, setHyperparameters } =
    useModelStore();
  const setTrainingMetrics = useResultStore((s) => s.setTrainingMetrics);

  const { getRequestBody } = useGenerateJson();

  const [hyperParams, setHyperParams] = useState({
    epoch: "",
    batchSize: "",
    learningRate: "",
  });

  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isTrainingDone, setIsTrainingDone] = useState(false);

  const handleChange = (key: keyof typeof hyperParams, value: string) => {
    setHyperParams((prev) => ({ ...prev, [key]: value }));
    setIsCompleted(false);
  };

  const [generatedCode, setGeneratedCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingLogs, setTrainingLogs] = useState<
    { epoch: number; loss: number; acc: number }[]
  >([]);

  const handleComplete = () => {
    setHyperparameters({
      epochs: hyperParams.epoch,
      batch_size: hyperParams.batchSize,
      learning_rate: hyperParams.learningRate,
    });
    setIsCompleted(true);
  };

  const handleGenerateCode = async () => {
    setIsGenerating(true);
    try {
      const body = getRequestBody();
      console.log("body:" + JSON.stringify(body, null, 2));
      const res = await modelApi.generateCode(body);
      setGeneratedCode(res.code);
      setIsTraining(false);
    } catch (error) {
      console.error("코드 생성 실패: ", error);
      alert("코드 생성에 실패했습니다.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTrainCode = () => {
    if (!generatedCode) {
      alert("먼저 코드 생성을 완료해주세요.");
      return;
    }
    const accessToken = token.sync() || "";
    console.log("WebSocket 연결 시도...");
    console.log("accessToken: " + accessToken);

    // WebSocket 연결 설정
    try {
      const socket = new WebSocket(
        `wss://buildlab.shop/ws/train?token=${accessToken}`
      );

      // 연결 성공 이벤트 핸들러
      socket.onopen = () => {
        console.log("WebSocket 연결 성공");
        setIsTraining(true);

        const parsedHyper = {
          epochs: Number(hyperParams.epoch),
          batch_size: Number(hyperParams.batchSize),
          learning_rate: Number(hyperParams.learningRate),
        };

        const body = {
          model_name: modelName,
          dataset: datasetName,
          form: parsedHyper,
          code: generatedCode,
        };

        console.log("WebSocket 전송 body:", body);
        socket.send(JSON.stringify(body));
        console.log("send() 완료");
      };

      // 메시지 수신 이벤트 핸들러
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === "log" && typeof data.message === "string") {
          console.log(data.message);
          try {
            const parsedMessage = JSON.parse(data.message);

            if (parsedMessage.type === "metric") {
              setTrainingMetrics(parsedMessage);
              console.log("setTrainingMetrics 완료");
            }
          } catch (err) {
            console.log(err);
          }

          const match = data.message.match(
            /epoch (\d+) \| loss ([\d.]+) \| acc ([\d.]+)/
          );
          if (match) {
            const [, epochStr, lossStr, accStr] = match;
            const epoch = parseInt(epochStr, 10);
            setTrainingLogs((prev) => [
              ...prev,
              {
                epoch,
                loss: parseFloat(lossStr),
                acc: parseFloat(accStr),
              },
            ]);
            setCurrentEpoch(epoch);
          }

          if (data.message === "모델 실행 완료") {
            console.log("모델 실행 완료");
            setIsTrainingDone(true);
          }
        }
      };

      // 연결 종료 이벤트 핸들러
      socket.onclose = (event) => {
        console.warn("WebSocket 연결 종료됨:", event.code, event.reason);
      };

      // 에러 처리 이벤트 핸들러
      socket.onerror = (event) => {
        console.error("WebSocket 오류 발생:", event);
      };
    } catch (err) {
      console.error("WebSocket 생성 중 예외 발생:", err);
      alert("웹소켓 연결을 시도하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col w-full items-center px-4 py-6 mt-12">
      {/* 구조 확인 및 하이퍼파라미터 설정 */}
      <article className="flex w-[90%] flex-row justify-between">
        <div className="p-4 text-gray-600 suit_16_M flex flex-col gap-4">
          <p>- 데이터셋: {datasetName}</p>
          <p>- 모델명: {modelName}</p>
          <p>- 레이어 수: {layers.length}</p>
        </div>

        <HyperparamForm
          values={hyperParams}
          onChange={handleChange}
          onComplete={handleComplete}
          isCompleted={isCompleted}
        />
      </article>

      {/* 코드 생성 */}
      <div className="mt-8 flex flex-row w-full gap-6 items-center justify-center">
        {isGenerating ? (
          <LoadingSpinner message="코드 생성 중입니다..." />
        ) : (
          <div
            onClick={handleGenerateCode}
            className="px-6 py-2 inline-block text-2xl suit_16_B bg-main_orange text-black hover:bg-orange-400 cursor-pointer border-[8px] rounded-[20px]"
          >
            코드 생성
          </div>
        )}
      </div>

      {/* 코드 훈련 */}
      {generatedCode && (
        <>
          <CodeViewer code={generatedCode} />

          <div className="w-full flex items-center justify-center mt-8">
            {isTraining ? (
              <div className="w-full">
                <EpochProgressBar
                  resetTrigger={currentEpoch}
                  isDone={isTrainingDone}
                />
                <TrainingGraph data={trainingLogs} />
              </div>
            ) : (
              <div
                onClick={handleTrainCode}
                className="px-6 py-2 inline-block text-2xl suit_16_B bg-main_orange text-black hover:bg-orange-400 cursor-pointer border-[8px] rounded-[20px]"
              >
                코드 훈련
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Step4;
