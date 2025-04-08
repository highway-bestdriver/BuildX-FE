// components/Step2.tsx
"use client";

import { preprocessingData } from "@constants/preprocessingData";
import { useState } from "react";
import SettingInput from "./_components/(block)/SettingInput";

const Step2 = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [inputs, setInputs] = useState<Record<string, Record<string, string>>>(
    {}
  );

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

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-6">🧹 전처리 설정</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.keys(preprocessingData).map((method) => (
          <div
            key={method}
            onClick={() => toggleSelection(method)}
            className={`border rounded-xl p-4 cursor-pointer transition hover:shadow-md ${
              selected.includes(method)
                ? "bg-main_blue text-white border-main_blue"
                : "bg-white"
            }`}
          >
            <h3 className="text-lg font-bold mb-1">{method}</h3>
            <p className="text-sm text-gray-500">
              {preprocessingData[method][0]?.placeholder ||
                "설정을 입력하려면 클릭"}
            </p>
          </div>
        ))}
      </div>

      {selected.length > 0 && (
        <div className="mt-8 space-y-6">
          {selected.map((method) => (
            <div key={method} className="bg-white border rounded-xl p-4">
              <h4 className="text-lg font-semibold mb-3">{method} 설정</h4>
              <div className="flex flex-col gap-3">
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
        </div>
      )}
    </div>
  );
};

export default Step2;
