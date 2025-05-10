"use client";

import { useState } from "react";
import SettingInput from "./_components/(block)/SettingInput";
import { preprocessingData } from "@constants/preprocessingData";
import { PreprocessingBlock, useModelStore } from "@store/useModelStore";
import { validateType } from "src/hooks/useValidateType";

const Step2 = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [inputs, setInputs] = useState<Record<string, Record<string, string>>>(
    {}
  );
  const [isCompleted, setIsCompleted] = useState(false);
  const setPreprocessing = useModelStore((store) => store.setPreprocessing);

  const toggleSelection = (method: string) => {
    setSelected((prev) =>
      prev.includes(method)
        ? prev.filter((m) => m !== method)
        : [...prev, method]
    );
    setIsCompleted(false);
  };

  const handleInputChange = (method: string, key: string, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [method]: {
        ...prev[method],
        [key]: value,
      },
    }));
    setIsCompleted(false);
  };

  const handleComplete = () => {
    for (const method of selected) {
      const paramDefs = preprocessingData[method];
      for (const { name, required, type } of paramDefs) {
        const val = inputs[method]?.[name];

        if (required && (!val || val.trim() === "")) {
          alert(`'${method}' 항목의 필수 입력 '${name}' 값이 누락되었습니다.`);
          return;
        }

        if (val && type && !validateType(val, type)) {
          alert(
            `'${method}' 항목의 '${name}' 값이 형식에 맞지 않습니다. (${type})`
          );
          return;
        }
      }
    }

    const formatted = selected.map((method) => {
      const entry: PreprocessingBlock = {
        type: method,
        ...(inputs[method] || {}),
      };
      return entry;
    });
    setPreprocessing(formatted);
    console.log("전역 상태 저장 완료:", formatted);
    setIsCompleted(true);
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
                {preprocessingData[method].map(
                  ({ name, placeholder, required }) => (
                    <SettingInput
                      key={name}
                      label={name}
                      placeholder={placeholder}
                      value={inputs[method]?.[name] || ""}
                      required={required}
                      onChange={(val) => handleInputChange(method, name, val)}
                    />
                  )
                )}
              </div>
            </div>
          ))}

          <div className="flex flex-col items-center justify-center mt-6">
            <div
              onClick={handleComplete}
              className="w-[110px] px-4 py-2 text-lg suit_16_SB bg-main_orange text-white rounded-lg hover:bg-orange-400 cursor-pointer"
            >
              Complete
            </div>
            {isCompleted && (
              <p className="pt-4 text-gray-600 suit_16_SB text-sm text-center">
                전처리 설정 완료! 다음 단계로 넘어가보아요.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Step2;
