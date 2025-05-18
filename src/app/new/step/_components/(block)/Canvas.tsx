"use client";

import { useRef, useState, useEffect } from "react";
import { BLOCK_HEIGHT, BLOCK_WIDTH, blockData } from "@constants/blockData";
import { useModelStore } from "@store/useModelStore";
import { useDrop } from "react-dnd";
import CanvasBlock from "./CanvasBlock";

interface BlockItem {
  id: string; // 내부 UUID
  label: string;
  color: string;
  x: number;
  y: number;
  isModalOpen: boolean;
}

interface ArrowLine {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  key: string;
}

const Canvas = () => {
  const [blocks, setBlocks] = useState<BlockItem[]>([]);
  const [arrows, setArrows] = useState<ArrowLine[]>([]);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const { layers, updateLayer, removeLayer } = useModelStore();

  // 블록 드롭
  const [, dropRef] = useDrop(() => ({
    accept: "BLOCK",
    drop: (item: { label: string; color: string }, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const canvas = canvasRef.current;
      if (!clientOffset || !canvas) return;

      const canvasRect = canvas.getBoundingClientRect();
      const x = clientOffset.x - canvasRect.left - BLOCK_WIDTH / 2;
      const y = clientOffset.y - canvasRect.top - BLOCK_HEIGHT / 2;

      const newId = crypto.randomUUID();

      setBlocks((prev) => [
        ...prev,
        {
          id: newId,
          label: item.label,
          color: item.color,
          x,
          y,
          isModalOpen: true,
        },
      ]);

      updateLayer({
        uuid: newId,
        id: "",
        type: item.label,
        input: "x",
        x,
        y,
      });
    },
  }));

  // 블록 삭제
  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBlocks((prev) => prev.filter((block) => block.id !== id));
    removeLayer(id);
  };

  // 블록 모달 열기
  const handleOpenModal = (id: string) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === id ? { ...block, isModalOpen: true } : block
      )
    );
  };

  // 블록 모달 닫기
  const handleCloseModal = (id: string) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === id ? { ...block, isModalOpen: false } : block
      )
    );
  };

  // 블록 이동
  const handleMoveBlock = (id: string, x: number, y: number) => {
    setBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, x, y } : block))
    );

    const layer = layers.find((l) => l.uuid === id);
    if (layer) {
      updateLayer({ ...layer, x, y }); // 전역 상태에도 좌표 반영
    }
  };

  // 블록 상태 복원
  useEffect(() => {
    if (!layers || layers.length === 0) return;

    const restoredBlocks = layers.map((layer) => {
      const blockMeta = blockData.find((b) => b.label === layer.type);
      const color = blockMeta?.color || "bg-gray-400"; // 기본색

      return {
        id: layer.uuid,
        label: layer.type,
        color,
        x: layer.x ?? 100,
        y: layer.y ?? 100,
        isModalOpen: false,
      };
    });

    setBlocks(restoredBlocks);
  }, []);

  // 블록 간 화살표
  useEffect(() => {
    const newArrows: ArrowLine[] = [];

    blocks.forEach((targetBlock) => {
      const targetLayer = layers.find((l) => l.uuid === targetBlock.id);
      if (!targetLayer || targetLayer.input === "x") return;

      const sourceBlock = blocks.find((b) => {
        const srcLayer = layers.find((l) => l.uuid === b.id);
        return srcLayer?.id === targetLayer.input;
      });

      if (sourceBlock) {
        newArrows.push({
          fromX: sourceBlock.x + BLOCK_WIDTH / 2,
          fromY: sourceBlock.y + BLOCK_HEIGHT,
          toX: targetBlock.x + BLOCK_WIDTH / 2,
          toY: targetBlock.y,
          key: `${sourceBlock.id}-${targetBlock.id}`,
        });
      }
    });

    setArrows(newArrows);
  }, [blocks, layers]);

  return (
    <div
      ref={(el) => {
        dropRef(el);
        canvasRef.current = el;
      }}
      className="w-full h-full border border-dashed border-gray-300 rounded-xl p-4 overflow-auto relative"
    >
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        {arrows.map((arrow) => (
          <line
            key={arrow.key}
            x1={arrow.fromX}
            y1={arrow.fromY}
            x2={arrow.toX}
            y2={arrow.toY}
            stroke="#afaeae"
            strokeWidth="1.5"
            markerEnd="url(#arrowhead)"
          />
        ))}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="8"
            markerHeight="7"
            refX="8"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 8 3.5, 0 7" fill="#afaeae" />
          </marker>
        </defs>
      </svg>

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
