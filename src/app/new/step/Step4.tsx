"use client";

import { useState } from "react";
import { useModelStore } from "@store/useModelStore";
import { modelApi } from "@api/client/model";
import { useGenerateJson } from "src/hooks/useGenerateJson";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { token } from "@api/token";

const Step4 = () => {
  const { modelName, datasetName, layers, setHyperparameters } =
    useModelStore();
  const { getRequestBody } = useGenerateJson();

  const [epoch, setEpoch] = useState("");
  const [batchSize, setBatchSize] = useState("");
  const [learningRate, setLearningRate] = useState("");

  const [generatedCode, setGeneratedCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isTraining, setIsTraining] = useState(false);

  const handleComplete = () => {
    setHyperparameters({
      epochs: epoch,
      batch_size: batchSize,
      learning_rate: learningRate,
    });
  };

  const handleGenerateCode = async () => {
    setIsGenerating(true);
    try {
      const body = getRequestBody();
      console.log("body:" + JSON.stringify(body, null, 2));
      const res = await modelApi.generateCode(body);
      setGeneratedCode(res.code);
    } catch (error) {
      console.error("코드 생성 실패: ", error);
      alert("코드 생성에 실패했습니다.");
    } finally {
      setIsGenerating(false);
    }
  };

  // const handleTrainCode = () => {
  //   setIsTraining(true);
  //   setTimeout(() => {
  //     setIsTraining(false);
  //     alert("훈련이 완료되었습니다.");
  //   }, 5000);
  // };

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

        const parsedHyper = {
          epochs: Number(epoch),
          batch_size: Number(batchSize),
          learning_rate: Number(learningRate),
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

        if (data.type === "log") {
          console.log("type: ", data.type);
          console.log(data.message);
        } else if (data.status) {
          console.log("상태:", data.status);
        } else if (data.error) {
          console.error("에러:", data.error);
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
      <article className="flex w-[90%] flex-row justify-between">
        <div className="p-4 text-gray-600 suit_16_M flex flex-col gap-4">
          <p>- 데이터셋: {datasetName}</p>
          <p>- 모델명: {modelName}</p>
          <p>- 레이어 수: {layers.length}</p>
        </div>

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

      <div className="mt-8 flex flex-row w-full gap-6 items-center justify-center">
        {isGenerating ? (
          <div className="flex flex-col items-center text-main_black">
            <div className="w-8 h-8 border-4 border-main_orange border-t-transparent rounded-full animate-spin" />
            <div className="suit_16_SB mt-2">코드 생성 중입니다...</div>
          </div>
        ) : (
          <div
            onClick={handleGenerateCode}
            className="px-6 py-2 inline-block text-2xl suit_16_B bg-main_orange text-black hover:bg-orange-400 cursor-pointer border-[8px] rounded-[20px]"
          >
            코드 생성
          </div>
        )}
      </div>

      {generatedCode && (
        <>
          <div className="flex flex-col mt-10 w-full bg-[#1e1e1e] text-white p-4 rounded-md shadow-md">
            <h3 className="text-lg suit_16_SB mb-3 text-main_orange">
              ㅣ 생성된 코드
            </h3>
            <pre className="text-sm whitespace-pre-wrap font-mono text-[#dcdcdc] leading-relaxed">
              <SyntaxHighlighter language="python" style={vscDarkPlus}>
                {generatedCode}
              </SyntaxHighlighter>
            </pre>
          </div>

          <div className="mt-8">
            {isTraining ? (
              <div className="flex flex-col items-center gap-2 text-main_black">
                <div className="w-8 h-8 border-4 border-orange-300 border-t-transparent rounded-full animate-spin" />
                <div className="suit_16_SB mt-2">코드 훈련 중입니다...</div>
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
