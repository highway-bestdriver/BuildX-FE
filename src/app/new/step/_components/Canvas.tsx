"use client";

import { useDrop } from "react-dnd";
import { useRef, useState } from "react";
import CanvasBlock from "./(block)/CanvasBlock";
import { BLOCK_HEIGHT, BLOCK_WIDTH } from "@constants/blockData";

interface BlockItem {
  id: string;
  label: string;
  color: string;
  x: number;
  y: number;
  isModalOpen: boolean;
}

const Canvas = () => {
  const [blocks, setBlocks] = useState<BlockItem[]>([]);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const [, dropRef] = useDrop(() => ({
    accept: "BLOCK",
    drop: (item: { label: string; color: string }, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const canvas = canvasRef.current;
      if (!clientOffset || !canvas) return;

      const canvasRect = canvas.getBoundingClientRect();
      const x = clientOffset.x - canvasRect.left - BLOCK_WIDTH / 2;
      const y = clientOffset.y - canvasRect.top - BLOCK_HEIGHT / 2;

      setBlocks((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          label: item.label,
          color: item.color,
          x,
          y,
          isModalOpen: true,
        },
      ]);
    },
  }));

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBlocks((prev) => prev.filter((block) => block.id !== id));
  };

  const handleOpenModal = (id: string) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === id ? { ...block, isModalOpen: true } : block
      )
    );
    console.log(id);
  };

  const handleCloseModal = (id: string) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === id ? { ...block, isModalOpen: false } : block
      )
    );
  };

  const handleMoveBlock = (id: string, x: number, y: number) => {
    setBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, x, y } : block))
    );
  };

  return (
    <div
      ref={(el) => {
        dropRef(el);
        canvasRef.current = el;
      }}
      className="w-full h-full border border-dashed border-gray-300 rounded-xl p-4 overflow-auto relative"
    >
      {blocks.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center text-gray-400 suit_16_R">
          여기에 블록을 드래그 앤 드롭하세요.
        </div>
      ) : (
        blocks.map((block) => (
          <CanvasBlock
            key={block.id}
            {...block}
            canvasRef={canvasRef}
            onRemove={handleRemove}
            onOpenModal={handleOpenModal}
            onCloseModal={handleCloseModal}
            onMove={handleMoveBlock}
          />
        ))
      )}
    </div>
  );
};

export default Canvas;
