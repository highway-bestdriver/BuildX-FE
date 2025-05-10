"use client";

import { useState, useEffect } from "react";
import SettingInput from "./SettingInput";
import { hyperParameterMap } from "@constants/blockData";
import { useModelStore } from "@store/useModelStore";
import { useValidateType } from "src/hooks/useValidateType";

interface SettingModalProps {
  label: string;
  blockUUID: string;
  onClose: () => void;
}

const SettingModal = ({ label, blockUUID, onClose }: SettingModalProps) => {
  const paramList = hyperParameterMap[label] || [];

  const {
    updateLayer,
    getLayerByUUID,
    layers,
    removeConnection,
    addConnection,
  } = useModelStore();
  const existing = getLayerByUUID(blockUUID);
  const [inputs, setInputs] = useState<Record<string, string>>({});

  // 기존 블록들의 id 목록을 input 후보로 택
  const inputOptions = [
    "x",
    ...layers
      .filter((layer) => layer.uuid !== blockUUID)
      .map((layer) => layer.id)
      .filter(Boolean),
  ];

  useEffect(() => {
    if (existing) {
      const { ...rest } = existing;
      setInputs(rest as Record<string, string>);
    }
  }, [existing]);

  const handleChange = (key: string, value: string) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const { id, input, ...params } = inputs;

    // 고유 이름 누락 검사
    if (!id || id.trim() === "") {
      alert("블록 이름은 필수 입력 항목입니다.");
      return;
    }

    // 중복된 ID 검사 (현재 블록 제외)
    const isDuplicated = layers.some(
      (layer) => layer.uuid !== blockUUID && layer.id === id
    );
    if (isDuplicated) {
      alert(`'${id}'는 이미 사용 중인 이름입니다. 다른 이름을 입력해주세요.`);
      return;
    }

    // 필수 항목 및 타입 유효성 검사
    for (const param of paramList) {
      const { name, required, type } = param;
      const value = inputs[name];

      if (required && !value) {
        alert(`"${name}"은 필수 항목입니다.`);
        return;
      }

      if (value && !useValidateType(value, type)) {
        alert(`"${name}" 입력값이 형식에 맞지 않습니다. (${type})`);
        return;
      }
    }

    // 저장 및 연결 갱신
    const flattenedLayer = {
      uuid: blockUUID,
      id,
      input,
      type: label,
      ...params,
    };

    updateLayer(flattenedLayer);
    removeConnection(blockUUID);
    if (input && input !== "x") {
      addConnection(input, blockUUID);
    }

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
          label="Name :"
          placeholder="고유한 블록명을 입력하세요"
          value={inputs["id"] || ""}
          onChange={(val) => handleChange("id", val)}
          isDefault={true}
        />

        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1 suit_16_SB">
            Input :
          </label>
          <select
            className="border rounded px-2 py-1 text-sm suit_16_R"
            value={inputs["input"] || "x"}
            onChange={(e) => handleChange("input", e.target.value)}
          >
            {inputOptions.map((option) => (
              <option key={option} value={option}>
                {option === "x" ? "x (초기 입력)" : option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 동적 필드 */}
      {paramList.length > 0 ? (
        <div className="flex flex-col gap-2">
          {paramList.map(({ name, placeholder, required }) => (
            <div key={name} className="flex flex-col">
              <SettingInput
                key={name}
                label={name}
                placeholder={placeholder}
                value={inputs[name] || ""}
                required={required}
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
