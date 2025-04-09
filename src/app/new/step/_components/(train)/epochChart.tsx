import { EpochLog } from "../../Step4";

const EpochChart = ({ data }: { data: EpochLog[] }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h3 className="text-lg font-semibold mb-3">📈 Epoch별 Accuracy / Loss</h3>
      {/* <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="epoch" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="accuracy" stroke="#8884d8" name="Accuracy" />
          <Line type="monotone" dataKey="loss" stroke="#82ca9d" name="Loss" />
        </LineChart>
      </ResponsiveContainer> */}
    </div>
  );
};

export default EpochChart;
