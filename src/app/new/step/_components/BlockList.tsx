import { blockData } from "@constants/blockData";

const BlockList = () => {
  return (
    <div className="flex flex-wrap gap-2">
      {blockData.map(({ label, color }) => (
        <div
          key={label}
          className={`square_16_SB text-black px-3 py-1 rounded-md cursor-pointer ${color}`}
        >
          {label}
        </div>
      ))}
    </div>
  );
};

export default BlockList;
