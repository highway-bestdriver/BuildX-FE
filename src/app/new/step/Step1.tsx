"use client";

import { useState } from "react";
import Class from "./_components/(dataset)/Class";
import { tfDatasetList } from "@constants/tfDatasetList";
import { IcBluePlus, IcTensorflow, ImgStep1 } from "@assets/icons";
import { useModelStore } from "@store/useModelStore";

const Step1 = () => {
  const [classes, setClasses] = useState<number[]>([1, 2]);
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
  const setDatasetName = useModelStore((state) => state.setDatasetName);

  const handleDatasetChange = (name: string) => {
    setSelectedDataset(name);
    setDatasetName(name);
    console.log("name: " + name);
  };

  const handleAddClass = () => {
    setClasses((prev) => [...prev, prev.length + 1]);
  };

  const renderDataset = () => (
    <div className="grid grid-cols-3 gap-2 px-4 py-1">
      {tfDatasetList.map((name) => (
        <label
          key={name}
          className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900"
        >
          <input
            type="radio"
            value={name}
            checked={selectedDataset === name}
            onChange={() => handleDatasetChange(name)}
            className="accent-main_blue"
          />
          <span>{name}</span>
        </label>
      ))}
    </div>
  );

  return (
    <div className="flex flex-row w-full justify-between items-end">
      <article className="mt-12">
        <div className="flex flex-row items-start bg-lightblue rounded-xl px-6 py-4 gap-2 shadow-md">
          <IcTensorflow width={20} />
          <div className="suit_16_SB text-[#3265CB] text-center">
            텐서플로우에서 가져오기
          </div>
          {renderDataset()}
        </div>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="square_16_M text-gray-600">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {classes.map((index) => (
          <Class key={index} index={index} />
        ))}

        <div
          onClick={handleAddClass}
          className="mt-4 h-20 border-2 border-dashed border-[#3265CB] rounded-xl flex items-center justify-center gap-2 cursor-pointer hover:bg-lightblue"
        >
          <IcBluePlus width={14} fill="#3265CB" />
          <span className="suit_16_M text-[#3265CB]">클래스 추가</span>
        </div>
      </article>
      <ImgStep1 width={250} className="mr-30" />
    </div>
  );
};

export default Step1;
