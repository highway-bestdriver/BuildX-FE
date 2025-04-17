"use client";

import { useState } from "react";
import SettingInput from "./_components/(block)/SettingInput";
import { preprocessingData } from "@constants/preprocessingData";
import { useModelStore } from "@store/useModelStore";

const Step2 = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [inputs, setInputs] = useState<Record<string, Record<string, string>>>(
    {}
  );
  const setPreprocessing = useModelStore((store) => store.setPreprocessing);

  const toggleSelection = (method: string) => {
    setSelected((prev) =>
      prev.includes(method)
        ? prev.filter((m) => m !== method)
        : [...prev, method]
    );
  };

  const handleInputChange = (method: string, key: string, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [method]: {
        ...prev[method],
        [key]: value,
      },
    }));
  };

  const handleComplete = () => {
    const filtered: Record<string, Record<string, string>> = {};
    selected.forEach((method) => {
      filtered[method] = inputs[method] || {};
    });
    setPreprocessing(filtered);
    console.log("전역 상태 저장 완료:", filtered);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl suit_16_SB mb-6">ㅣ 전처리 설정</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.keys(preprocessingData).map((method) => (
          <div
            key={method}
            onClick={() => toggleSelection(method)}
            className={`border rounded-xl px-6 py-4 cursor-pointer transition hover:shadow-md ${
              selected.includes(method)
                ? "bg-main_blue text-white border-main_blue square_16_SB"
                : "bg-white square_16_SB"
            }`}
          >
            <h3 className="text-lg square_16_SB mb-1">{method}</h3>
            <p className="text-sm suit_16_M text-gray-400">
              {preprocessingData[method][0]?.placeholder ||
                "설정을 입력하려면 클릭"}
            </p>
          </div>
        ))}
      </div>

      {selected.length > 0 && (
        <div className="mt-8 space-y-4">
          {selected.map((method) => (
            <div key={method} className="bg-white border rounded-xl px-6 py-4">
              <h4 className="text-lg suit_16_B mb-3">{method} 설정</h4>
              <div className="flex flex-col gap-2">
                {preprocessingData[method].map(({ name, placeholder }) => (
                  <SettingInput
                    key={name}
                    label={name}
                    placeholder={placeholder}
                    value={inputs[method]?.[name] || ""}
                    onChange={(val) => handleInputChange(method, name, val)}
                  />
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-6">
            <span
              onClick={handleComplete}
              className="px-4 py-2 text-lg suit_16_SB bg-main_orange text-white rounded-lg hover:bg-orange-400 cursor-pointer"
            >
              Complete
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step2;
