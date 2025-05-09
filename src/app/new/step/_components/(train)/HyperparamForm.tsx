interface Props {
  values: {
    epoch: string;
    batchSize: string;
    learningRate: string;
  };
  onChange: (key: keyof Props["values"], value: string) => void;
  onComplete: () => void;
}

const HyperparamForm = ({ values, onChange, onComplete }: Props) => {
  return (
    <div className="suit_16_M flex flex-col bg-white p-4 rounded-xl gap-4">
      <div className="suit_16_B text-lg">고급</div>

      {[
        { label: "에포크", key: "epoch" },
        { label: "배치 크기", key: "batchSize" },
        { label: "학습률", key: "learningRate" },
      ].map(({ label, key }) => (
        <span
          key={key}
          className="flex flex-row justify-between items-center gap-2"
        >
          <span>{label}: </span>
          <input
            className="flex-1 suit_16_R border-0 border-b border-main_black pb-1"
            value={values[key as keyof Props["values"]]}
            onChange={(e) =>
              onChange(key as keyof Props["values"], e.target.value)
            }
          />
        </span>
      ))}

      <div className="flex justify-center mt-6">
        <span
          onClick={onComplete}
          className="px-4 py-2 text-lg suit_16_SB bg-gray-400 text-white rounded-lg hover:bg-gray-500 cursor-pointer"
        >
          Complete
        </span>
      </div>
    </div>
  );
};

export default HyperparamForm;
