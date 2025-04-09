import { useEffect, useRef, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

export interface EpochLog {
  epoch: number;
  accuracy: number;
  loss: number;
}

export interface FinalMetrics {
  precision: number;
  recall: number;
  f1_score: number;
  auc: number;
}

const baseUrl = "http://3.36.174.211";

const Step4 = () => {
  const [epochLogs, setEpochLogs] = useState<EpochLog[]>([]);
  const [finalMetrics, setFinalMetrics] = useState<FinalMetrics | null>(null);
  const [trainingDone, setTrainingDone] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(`${baseUrl}/ws/train`);
    socketRef.current = socket;

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "epoch_log") {
        setEpochLogs((prev) => [...prev, data]);
      } else if (data.type === "final_metrics") {
        setFinalMetrics(data);
      } else if (data.status === "학습 완료") {
        setTrainingDone(true);
        socket.close();
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl suit_16_B mb-6">📊 학습 모니터링 (Step 4)</h2>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold mb-3">
          📈 Epoch별 Accuracy / Loss
        </h3>

        {/* LineChart */}
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={epochLogs}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="epoch" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="accuracy"
              stroke="#8884d8"
              name="Accuracy"
            />
            <Line type="monotone" dataKey="loss" stroke="#82ca9d" name="Loss" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* RadarChart */}
      {finalMetrics && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg suit_16_B mb-3">🏁 최종 평가 지표</h3>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart
              outerRadius={120}
              data={Object.entries(finalMetrics).map(([k, v]) => ({
                metric: k,
                value: v,
              }))}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="성능"
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}

      {trainingDone && (
        <div className="mt-6 p-4 rounded-md bg-green-100 text-green-700 text-center suit_16_SB">
          모델 학습이 완료되었습니다.
        </div>
      )}
    </div>
  );
};

export default Step4;
