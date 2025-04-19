"use client";

import { useDrag } from "react-dnd";

interface DraggableBlockProps {
  label: string;
  color: string;
}

const DraggableBlock = ({ label, color }: DraggableBlockProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "BLOCK",
    item: { label, color },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={drag as any}
      className={`square_16_SB text-black px-3 py-1 rounded-md cursor-pointer ${color} opacity-${
        isDragging ? 50 : 100
      }`}
    >
      {label}
    </div>
  );
};

export default DraggableBlock;
