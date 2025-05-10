"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface DataPoint {
  epoch: number;
  loss: number;
  acc: number;
}

interface TrainingGraphProps {
  data: DataPoint[];
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any[];
  label?: number;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-300 rounded-lg p-3 shadow-md">
        <p className="suit_16_M text-gray-700 mb-2">{`Epoch ${label}`}</p>
        <p className="border-t border-gray-400 mb-2" />
        {payload.map((entry, index) => (
          <p key={index} className="suit_16_SB text-[14px]">
            <span
              className={`${
                entry.dataKey === "acc" ? "text-[#0a6037]" : "text-[#f90808]"
              }`}
            >
              {entry.dataKey === "acc" ? "정확도" : "손실"}:&nbsp;
            </span>
            {entry.dataKey === "acc"
              ? `${(entry.value * 100).toFixed(2)}%`
              : entry.value.toFixed(4)}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const TrainingGraph: React.FC<TrainingGraphProps> = ({ data }) => {
  const firstLoss = data[0]?.loss ?? 0;
  const firstAcc = data[0]?.acc ?? 0;

  // 손실: ±30%
  const lossDomain = [Math.max(0, firstLoss * 0.8), firstLoss * 1.1];

  // 정확도: ±10%
  const accDomain = [Math.max(0, firstAcc * 0.9), Math.min(1, firstAcc * 1.1)];

  return (
    <div className="w-full h-[400px] bg-white shadow rounded-xl p-4">
      <h3 className="suit_16_B text-lg text-main_black mb-4">ㅣ 훈련 그래프</h3>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 40, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="epoch"
            tick={{ fontSize: 12 }}
            label={{ value: "Epoch", position: "insideBottom", offset: -5 }}
          />

          {/* 좌측 Y축: 손실 */}
          <YAxis
            yAxisId="loss"
            tick={{ fontSize: 12 }}
            orientation="left"
            stroke="#f90808"
            domain={lossDomain}
            tickFormatter={(value) => value.toFixed(4)}
            label={{
              value: "손실 (loss)",
              angle: -90,
              position: "insideLeft",
              fontSize: 12,
              fill: "#f90808",
            }}
          />

          {/* 우측 Y축: 정확도 */}
          <YAxis
            yAxisId="acc"
            tick={{ fontSize: 12 }}
            orientation="right"
            domain={accDomain}
            tickFormatter={(value) => value.toFixed(4)}
            stroke="#0a6037"
            label={{
              value: "정확도 (accuracy)",
              angle: -90,
              position: "insideRight",
              fontSize: 12,
              fill: "#0a6037",
            }}
          />

          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            align="right"
            height={36}
            wrapperStyle={{ fontSize: 14 }}
          />

          <Line
            yAxisId="acc"
            type="linear"
            dataKey="acc"
            name="정확도 (accuracy)"
            stroke="#0a6037"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
            isAnimationActive
            animationDuration={700}
          />
          <Line
            yAxisId="loss"
            type="linear"
            dataKey="loss"
            name="손실 (loss)"
            stroke="#f90808"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
            isAnimationActive
            animationDuration={700}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrainingGraph;
