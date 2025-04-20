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
import { metricsList, feedbackList } from "@constants/resultData";

const Step5 = () => {
  const [metrics, setMetrics] = useState<null | {
    accuracy: number;
    precision: number;
    recall: number;
    f1_score: number;
    auc_roc: number;
    loss: number;
  }>(null);

  const [rdFeedback, setRdFeedback] = useState("");

  // 클라이언트에서만 실행
  useEffect(() => {
    if (typeof window !== "undefined") {
      const metricIdx = Math.floor(Math.random() * metricsList.length);
      setMetrics(metricsList[metricIdx]);

      const idx = Math.floor(Math.random() * feedbackList.length);
      setRdFeedback(feedbackList[idx]);
    }
  }, []);

  if (!metrics) {
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

  const minLoss = 0.2;
  const maxLoss = 1.5;

  const data = [
    { metric: "정확도", value: metrics.accuracy },
    { metric: "정밀도", value: metrics.precision },
    { metric: "재현율", value: metrics.recall },
    { metric: "f1-score", value: metrics.f1_score },
    { metric: "AUC-ROC", value: metrics.auc_roc },
    {
      metric: "normalized loss",
      value: 1 - (metrics.loss - minLoss) / (maxLoss - minLoss),
    },
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
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={30} domain={[0, 1]} />
              <Radar
                name="모델 성능"
                dataKey="value"
                stroke="#ff7300"
                fill="#ff7300"
                fillOpacity={0.6}
                label={false}
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
                {metric === "normalized loss" ? "loss" : metric}
              </span>
              <span>
                {metric === "normalized loss"
                  ? metrics.loss.toFixed(2)
                  : `${(value * 100).toFixed(2)}%`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* GPT 분석 평가 */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h3 className="text-xl suit_16_B text-main_black mb-4">
          # 종합 분석 평가
        </h3>
        <div className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">
          {rdFeedback}
        </div>
      </div>
    </div>
  );
};

export default Step5;
