import { HyperParameter } from "./blockData";

export const preprocessingData: Record<string, HyperParameter[]> = {
  Resize: [
    { name: "height", placeholder: "높이 - 원하는 이미지 크기 값 (정수 값)" },
    { name: "width", placeholder: "너비- 원하는 이미지 크기 값 (정수 값)" },
  ],
  RandomCrop: [
    {
      name: "height",
      placeholder: "크롭 크기- 원하는 이미지 크기 값 (정수 값)",
    },
    {
      name: "width",
      placeholder: "크롭 크기- 원하는 이미지 크기 값 (정수 값)",
    },
  ],
  RandomContrast: [
    { name: "factor", placeholder: "contrast 변화 폭 - [0,1]" },
    { name: "seed", placeholder: "" },
  ],
  RandomFlip: [
    {
      name: "mode",
      placeholder: "“horizontal”, “vertical”, “horizontal_and_vertical” 중 택1",
    },
    { name: "seed", placeholder: "" },
  ],
  RandomRotation: [
    { name: "factor", placeholder: "회전 각도 비율 - [0,1]" },
    { name: "seed", placeholder: "" },
  ],
  RandomTranslation: [
    {
      name: "height_factor",
      placeholder: "이미지 높이 기준 이동 비율 - [0,1]",
    },
    { name: "width_factor", placeholder: "이미지 너비 기준 이동 비율 - [0,1]" },
    { name: "seed", placeholder: "" },
  ],
};
