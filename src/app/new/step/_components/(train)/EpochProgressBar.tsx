"use client";
import { useEffect, useState } from "react";

interface EpochProgressBarProps {
  resetTrigger: number; // 리셋 조건
  totalSteps?: number; // 전체 블록 수
  interval?: number; // 간격(ms)
  isDone?: boolean;
}

const EpochProgressBar = ({
  resetTrigger,
  totalSteps = 30,
  interval = 1000,
  isDone = false,
}: EpochProgressBarProps) => {
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    setFilled(0);
    const id = setInterval(() => {
      setFilled((prev) => {
        if (prev >= totalSteps || isDone) {
          clearInterval(id);
          return totalSteps;
        }
        return prev + 1;
      });
    }, interval);

    return () => clearInterval(id);
  }, [resetTrigger, isDone]);

  return (
    <div className="flex flex-col items-center mt-8 mb-10">
      <div className="w-full flex gap-[5px] justify-center items-center mb-3">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-6  transition-all duration-200 ${
              i < filled ? "bg-main_black" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
      <div className="geist_16_SB">Training...</div>
    </div>
  );
};

export default EpochProgressBar;
