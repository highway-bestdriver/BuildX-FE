"use client";

import { useRef, useState } from "react";
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

  const [errorInfo, setErrorInfo] = useState<{
    reason: string;
    expected: string[];
    actual: string[];
  } | null>(null);

  const handleGenerateCode = async () => {
    setIsGenerating(true);
    setErrorInfo(null);

    try {
      const body = getRequestBody();
      console.log("body:" + JSON.stringify(body, null, 2));
      const res = await modelApi.generateCode(body);

      console.log("res: ", JSON.stringify(res, null, 2));
      setGeneratedCode(res.code);

      if (res.error?.valid === false) {
        console.log("reason:", res.error.reason);
        console.log("expected:", res.error.expected);
        console.log("actual:", res.error.actual);
        setErrorInfo({
          reason: res.error.reason!,
          expected: res.error.expected!,
          actual: res.error.actual!,
        });
      }

      setIsTraining(false);
    } catch (error) {
      console.error("코드 생성 실패: ", error);
      alert("코드 생성에 실패했습니다.");
    } finally {
      setIsGenerating(false);
    }
  };

  const [errorSummary, setErrorSummary] = useState("");
  const socketRef = useRef<WebSocket | null>(null);

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
      // const socket = new WebSocket(
      //   `wss://buildlab.shop/ws/train?token=${accessToken}`
      // );
      socketRef.current = new WebSocket(
        `wss://buildlab.shop/ws/train?token=${accessToken}`
      );
      const socket = socketRef.current;

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
        console.log("onmessage 시작");
        console.log(data.message);

        // 학습 도중 에러
        if (data.type === "error_analysis") {
          console.log("summary: ", data.summary);
          setErrorSummary(data.summary);
          // 웹소켓 연결 종료
          socketRef.current?.close(
            1000,
            "Training stopped due to error summary"
          );
          setIsTraining(false);
          return;
        }

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
      <div className="mt-8 flex flex-col w-full gap-6 items-center justify-center">
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

        {errorInfo && (
          <div className="mt-4 p-4 border border-red-500 rounded-lg bg-red-50 text-red-700 suit_16_R text-sm w-[70%]">
            <p className="font-bold text-lg">⚠ 실행 순서 에러</p>
            <p className="mt-1">사유: {errorInfo.reason}</p>
            <p className="mt-1">예상 순서: {errorInfo.expected.join(" → ")}</p>
            <p className="mt-1">실제 순서: {errorInfo.actual.join(" → ")}</p>
            <br />
            <p className="text-sm text-red-600 mt-2">
              ** Step3로 돌아가 코드 구조 오류를 먼저 수정해주세요. **
            </p>
          </div>
        )}
      </div>

      {/* 코드 훈련 */}
      {generatedCode && (
        <>
          <CodeViewer code={generatedCode} />

          <div className="w-full flex flex-col items-center justify-center mt-8">
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
                className={`px-6 py-2 inline-block text-2xl suit_16_B text-black border-[8px] rounded-[20px] ${
                  errorInfo
                    ? "bg-gray-400 "
                    : "bg-main_orange hover:bg-orange-400 cursor-pointer"
                }`}
              >
                코드 훈련
              </div>
            )}

            {errorSummary && (
              <div className="mt-6 p-4 border border-red-500 rounded-lg bg-red-50 text-red-700 suit_16_R w-[80%] mx-auto">
                <p className="font-bold text-lg suit_16_M">⛔ 학습 중단됨</p>
                <pre className="whitespace-pre-wrap mt-2 suit_16_R">
                  {errorSummary}
                </pre>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Step4;
