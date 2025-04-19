"use client";

import { useState, useEffect } from "react";
import SettingInput from "./SettingInput";
import { hyperParameterMap } from "@constants/blockData";
import { useModelStore } from "@store/useModelStore";

interface SettingModalProps {
  label: string;
  blockUUID: string;
  onClose: () => void;
}

const SettingModal = ({ label, blockUUID, onClose }: SettingModalProps) => {
  const paramList = hyperParameterMap[label] || [];

  const { updateLayer, getLayerByUUID } = useModelStore();
  const existing = getLayerByUUID(blockUUID);
  const [inputs, setInputs] = useState<Record<string, string>>({});

  useEffect(() => {
    if (existing) {
      const { ...rest } = existing;
      setInputs(rest as Record<string, string>); // 타입 단순 단언
    }
  }, [existing]);

  const handleChange = (key: string, value: string) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const { id, input, ...params } = inputs;
    const flattenedLayer = {
      uuid: blockUUID,
      id,
      input,
      type: label,
      ...params,
    };
    updateLayer(flattenedLayer);
    onClose();
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleClick}
      className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg p-4 z-10 w-80"
    >
      <div className="text-black suit_16_SB mb-2">
        <b>Settings</b> [type: {label}]
      </div>

      {/* 고정 필드 */}
      <div className="flex flex-col gap-2 mb-4">
        <SettingInput
          label="ID :"
          placeholder="고유한 ID를 입력하세요"
          value={inputs["id"] || ""}
          onChange={(val) => handleChange("id", val)}
          isDefault={true}
        />
        <SettingInput
          label="Input :"
          placeholder="Input 블록의 ID를 입력하세요"
          value={inputs["input"] || ""}
          onChange={(val) => handleChange("input", val)}
          isDefault={true}
        />
      </div>

      {/* 동적 필드 */}
      {paramList.length > 0 ? (
        <div className="flex flex-col gap-2">
          {paramList.map(({ name, placeholder }) => (
            <div key={name} className="flex flex-col">
              <SettingInput
                key={name}
                label={name}
                placeholder={placeholder}
                value={inputs[name] || ""}
                onChange={(val) => handleChange(name, val)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm suit_16_M text-gray-500">
          설정할 항목이 없습니다.
        </div>
      )}

      <div className="flex w-full justify-end gap-2">
        <span
          onClick={handleSave}
          className="suit_16_SB cursor-pointer mt-4 px-3 py-1 text-sm bg-main_black text-white hover:bg-gray-400 rounded-md"
        >
          저장
        </span>
        <span
          onClick={onClose}
          className="suit_16_SB cursor-pointer mt-4 px-3 py-1 text-sm bg-gray-200 hover:bg-gray-400 rounded-md"
        >
          닫기
        </span>
      </div>
    </div>
  );
};
export default SettingModal;
