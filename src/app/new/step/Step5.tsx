"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { useResultStore } from "@store/useResultStore";
import { useGenerateJson } from "src/hooks/useGenerateJson";
import { modelApi } from "@api/client/model";
import { ImgStep5 } from "@assets/icons";

const Step5 = () => {
  const metrics = useResultStore((s) => s.trainingMetrics);
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { getFeedbackRequestBody } = useGenerateJson();

  // GPT 피드백 반환
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const body = getFeedbackRequestBody();
        console.log("body:" + JSON.stringify(body, null, 2));
        const res = await modelApi.feedbackCode(body);
        setFeedback(res.feedback);
      } catch (error) {
        console.error("피드백 요청 실패:", error);
        setFeedback("피드백 요청 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    if (metrics) {
      fetchFeedback();
    }
  }, []);

  if (!metrics || isLoading) {
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-main_orange rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-3 h-3 bg-main_orange rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-3 h-3 bg-main_orange rounded-full animate-bounce" />
        </div>
      </div>
    );
  }

  // 지표 데이터
  const minLoss = 0.2;
  const maxLoss = 3.0;

  const data = [
    { metric: "train_acc", value: metrics.train_acc },
    {
      metric: "normalized train_loss",
      value: 1 - (metrics.train_loss - minLoss) / (maxLoss - minLoss),
    },
    { metric: "test_acc", value: metrics.test_acc },
    {
      metric: "normalized test_loss",
      value: 1 - (metrics.test_loss - minLoss) / (maxLoss - minLoss),
    },
    { metric: "test_precision", value: metrics.test_precision },
    { metric: "test_recall", value: metrics.test_recall },
    { metric: "test_f1", value: metrics.test_f1 },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 flex flex-col gap-8">
      <h2 className="text-2xl suit_16_B text-main_black text-center">
        최종 평가 지표
      </h2>

      {/* Radar 차트 + 지표 수치 */}
      <div className="w-full bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        <div className="w-full md:w-[70%] h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis
                dataKey="metric"
                tick={{ fontSize: 14, fill: "#555" }}
              />
              <PolarRadiusAxis angle={38.6} domain={[0, 1]} />
              <Radar
                name="모델 성능"
                dataKey="value"
                stroke="#ff7300"
                fill="#ff7300"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* 수치 표시 */}
        <div className="w-full pt-12 pr-12 md:w-[40%] flex flex-col justify-center gap-2 text-sm text-gray-700">
          {data.map(({ metric, value }) => (
            <div
              key={metric}
              className="flex justify-between border-b py-1 px-2"
            >
              <span className="font-medium">
                {metric === "normalized train_loss"
                  ? "train_loss"
                  : metric === "normalized test_loss"
                  ? "test_loss"
                  : metric}
              </span>
              <span>
                {metric === "normalized train_loss"
                  ? metrics.train_loss.toFixed(2)
                  : metric === "normalized test_loss"
                  ? metrics.test_loss.toFixed(2)
                  : `${(value * 100).toFixed(2)}%`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* GPT 분석 평가 */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <div className="flex flex-row justify-between">
          <h3 className="text-xl suit_16_B text-main_black mb-4">
            # 종합 분석 평가
          </h3>
          <ImgStep5
            width={130}
            className="absolute top-[680px] left-[1250px]"
          />
        </div>

        <div className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">
          {feedback}
        </div>
      </div>
    </div>
  );
};

export default Step5;
