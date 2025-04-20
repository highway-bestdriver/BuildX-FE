"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { feedback, metrics } from "@constants/resultData";

const Step5 = () => {
  const data = [
    { metric: "정확도", value: metrics.accuracy },
    { metric: "정밀도", value: metrics.precision },
    { metric: "재현율", value: metrics.recall },
    { metric: "f1-score", value: metrics.f1_score },
    { metric: "AUC-ROC", value: metrics.auc_roc },
    { metric: "loss", value: 1 - metrics.loss }, // 낮을수록 좋으므로 반대로
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 flex flex-col gap-8">
      <h2 className="text-2xl suit_16_B text-main_black text-center">
        최종 평가 지표
      </h2>

      {/* Radar 차트 */}
      <div className="w-full h-[400px] bg-white rounded-xl shadow p-6">
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

      {/* GPT 분석 평가 */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h3 className="text-xl suit_16_B text-main_black mb-4">
          # 종합 분석 평가
        </h3>
        <div className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">
          {feedback}
        </div>
      </div>
    </div>
  );
};

export default Step5;
