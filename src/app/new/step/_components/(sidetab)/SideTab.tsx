"use client";

import { useState } from "react";
import ModelList from "./ModelList";
import BlockList from "./BlockList";

const SideTab = () => {
  const [activeTab, setActiveTab] = useState<"models" | "blocks">("models");

  return (
    <div className="bg-main_blue min-h-[42rem] rounded-tr-[2rem] px-4 py-4">
      {/* 탭 선택 */}
      <div className="flex gap-4 mb-4 square_16_B text-white">
        <button
          className={`cursor-pointer hover:text-white ${
            activeTab === "models" ? "text-white underline" : "text-gray-300"
          }`}
          onClick={() => setActiveTab("models")}
        >
          Models
        </button>
        <button
          className={`cursor-pointer hover:text-white ${
            activeTab === "blocks" ? "text-white underline" : "text-gray-300"
          }`}
          onClick={() => setActiveTab("blocks")}
        >
          Blocks
        </button>
      </div>

      {/* 탭 콘텐츠 */}
      {activeTab === "models" ? <ModelList /> : <BlockList />}
    </div>
  );
};

export default SideTab;
