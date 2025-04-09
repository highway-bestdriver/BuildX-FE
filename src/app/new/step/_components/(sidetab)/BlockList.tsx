import { blockData } from "@constants/blockData";
import DraggableBlock from "../(block)/DraggableBlock";

const BlockList = () => {
  return (
    <div className="flex flex-wrap gap-2">
      {blockData.map(({ label, color }) => (
        <DraggableBlock key={label} label={label} color={color} />
      ))}
    </div>
  );
};

export default BlockList;
