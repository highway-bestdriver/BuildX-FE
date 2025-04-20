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
import { feedbackList } from "@constants/resultData";

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
      const randomInRange = (min: number, max: number, decimals = 4) =>
        Number((Math.random() * (max - min) + min).toFixed(decimals));

      setMetrics({
        accuracy: randomInRange(0.6, 0.9),
        precision: randomInRange(0.5, 0.85),
        recall: randomInRange(0.5, 0.85),
        f1_score: randomInRange(0.5, 0.85),
        auc_roc: randomInRange(0.6, 0.95),
        loss: randomInRange(0.2, 0.6),
      });

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

  const data = [
    { metric: "정확도", value: metrics.accuracy },
    { metric: "정밀도", value: metrics.precision },
    { metric: "재현율", value: metrics.recall },
    { metric: "f1-score", value: metrics.f1_score },
    { metric: "AUC-ROC", value: metrics.auc_roc },
    { metric: "loss", value: 1 - metrics.loss },
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
              <span className="font-medium">{metric}</span>
              <span>{(value * 100).toFixed(2)}%</span>
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
