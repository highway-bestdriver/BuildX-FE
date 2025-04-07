import Image from "next/image";
import { modelData } from "@constants/modelData";
import { useState } from "react";

const ModelList = () => {
  const [selectedModel, setSelectedModel] = useState(0);
  const handleSelectModel = (id: number) => {
    setSelectedModel(id);
  };
  return (
    <>
      {/* 안내 문구 */}
      {selectedModel !== 0 && (
        <div className="flex flex-col gap-2 mb-4 p-3 border border-main_orange bg-orange-50 rounded-lg shadow-sm">
          <span className="text-main_orange text-base suit_16_SB">
            Blocks 탭 ⬆️으로 이동하여
          </span>
          <span className="text-main_orange text-sm suit_16_M">
            레이어 블록들을 드래그 앤 드롭해보세요!
          </span>
        </div>
      )}

      {/* 모델 리스트 */}
      <div className="grid grid-cols-2 gap-3">
        {modelData.map((model) => (
          <div
            key={model.id}
            className={`relative flex flex-col items-center p-3 rounded-xl cursor-pointer transition border-2 bg-white ${
              selectedModel === model.id
                ? "border-main_orange shadow-md scale-105"
                : "border-transparent hover:border-gray-200 hover:scale-105 "
            }`}
            onClick={() => handleSelectModel(model.id)}
          >
            <Image
              src={model.icon}
              alt={model.name}
              width={70}
              height={70}
              className="mb-2"
            />
            <span
              className={`suit_16_M text-sm text-center ${
                selectedModel === model.id
                  ? "text-main_orange font-bold"
                  : "text-black"
              }`}
            >
              {model.name}
            </span>

            {/* 선택됨 표기 */}
            {selectedModel === model.id && (
              <div className="absolute suit_16_M top-2 right-2 bg-main_orange text-white text-[10px] px-2 py-0.5 rounded-full shadow-sm">
                선택됨
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ModelList;
