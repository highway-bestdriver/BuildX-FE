"use client";

import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import SettingModal from "./SettingModal";
import { BLOCK_HEIGHT, BLOCK_WIDTH } from "@constants/blockData";

interface BlockProps {
  id: string;
  label: string;
  color: string;
  x: number;
  y: number;
  isModalOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  canvasRef: React.RefObject<HTMLDivElement> | any;
  onRemove: (id: string, e: React.MouseEvent) => void;
  onOpenModal: (id: string) => void;
  onCloseModal: (id: string) => void;
  onMove: (id: string, newX: number, newY: number) => void;
}

const CanvasBlock = ({
  id,
  label,
  color,
  x,
  y,
  isModalOpen,
  canvasRef,
  onRemove,
  onOpenModal,
  onCloseModal,
  onMove,
}: BlockProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [, drag] = useDrag(() => ({
    type: "CANVAS_BLOCK",
    item: { id },
    end: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const canvas = canvasRef.current;
      if (!clientOffset || !canvas) return;

      const canvasRect = canvas.getBoundingClientRect();
      const newX = clientOffset.x - canvasRect.left - BLOCK_WIDTH / 2;
      const newY = clientOffset.y - canvasRect.top - BLOCK_HEIGHT / 2;

      onMove(item.id, newX, newY);
    },
  }));

  const [, drop] = useDrop(() => ({
    accept: "CANVAS_BLOCK",
    hover(item: { id: string }, monitor) {
      const clientOffset = monitor.getClientOffset();
      const canvas = canvasRef.current;
      if (!clientOffset || !canvas) return;

      const canvasRect = canvas.getBoundingClientRect();
      const newX = clientOffset.x - canvasRect.left - BLOCK_WIDTH / 2;
      const newY = clientOffset.y - canvasRect.top - BLOCK_HEIGHT / 2;

      onMove(item.id, newX, newY);
    },
  }));

  drag(drop(ref));

  return (
    <div
      ref={ref}
      onClick={() => onOpenModal(id)}
      className={`w-45 absolute flex flex-row justify-between items-center square_16_SB text-black px-3 py-1 rounded-md ${color} cursor-move`}
      style={{ left: x, top: y }}
    >
      {label}
      <button
        onClick={(e) => onRemove(id, e)}
        className="text-sm text-white ml-2"
      >
        ✕
      </button>

      {isModalOpen && (
        <SettingModal
          label={label}
          blockUUID={id}
          onClose={() => onCloseModal(id)}
        />
      )}
    </div>
  );
};

export default CanvasBlock;
