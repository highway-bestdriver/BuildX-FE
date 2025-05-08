import { HyperParameter } from "./blockData";

export const preprocessingData: Record<string, HyperParameter[]> = {
  Resize: [
    {
      name: "size",
      placeholder:
        "출력 이미지 크기, int 또는  [height, width] 형태의 List[int]",
      required: true,
    },
    {
      name: "interpolation",
      placeholder:
        "보간 방식. “bilinear”, “nearest” 등 문자열 or 정수(enum). 기본값 “bilinear”",
    },
    {
      name: "max_size",
      placeholder: "최대 허용 크기 (size가 int일 때만 적용)",
    },
    {
      name: "antialias",
      placeholder: "안티앨리어싱 필터 적용 여부. 기본값 True",
    },
  ],
  CenterCrop: [
    {
      name: "size",
      placeholder:
        "중심에서 자를 영역 크기. int 또는 [height, width] 형태의 List[int]",
      required: true,
    },
  ],
  RandomCrop: [
    {
      name: "size",
      placeholder: "자를 크기. int 또는 [height, width]",
      required: true,
    },
    {
      name: "padding",
      placeholder: "crop 전에 padding 추가. int 또는 [int, int, int, int] 형태",
    },
    {
      name: "pad_if_needed",
      placeholder: "입력이 작을 경우 padding 추가 여부. 기본값 False",
    },
    {
      name: "fill",
      placeholder:
        "패딩 채울 값. int, float, List[int], List[float], None. 기본값 0",
    },
    {
      name: "padding_mode",
      placeholder:
        "“constant”, “edge”, “reflect”, “symmetric”. 기본 “constant”",
    },
  ],
  RandomHorizontalFlip: [
    { name: "p", placeholder: "좌우 반전 확률 (0~1). 기본값 0.5" },
  ],
  RandomVerticalFlip: [
    { name: "p", placeholder: "상하 반전 확률 (0~1). 기본값 0.5" },
  ],
  RandomRotation: [
    {
      name: "degrees",
      placeholder: "회전 각도 범위. float 또는 [min, max] 리스트",
      required: true,
    },
    {
      name: "interpolation",
      placeholder: "보간 방식. “nearest”, “bilinear”. 기본값 “nearest”",
    },
    {
      name: "expand",
      placeholder: "회전 후 전체 이미지 보이도록 확장 여부. 기본값 False",
    },
    { name: "center", placeholder: "회전 중심 (x,y). 기본값 None(중앙)" },
    { name: "fill", placeholder: "회전 후 빈 부분 채울 색. 기본값 0 (검정)" },
  ],
  ColorJitter: [
    {
      name: "brightness",
      placeholder: "밝기 조정 범위. float 또는 [min, max] 리스트",
    },
    {
      name: "contrast",
      placeholder: "대비 조정 범위. float 또는 [min, max] 리스트",
    },
    {
      name: "saturation",
      placeholder: "채도 조정 범위. float 또는 [min, max] 리스트",
    },
    {
      name: "hue",
      placeholder: "색조 조정 범위. float 또는 [min, max] 리스트",
    },
  ],
  Normalize: [
    {
      name: "mean",
      placeholder: "각 채널별 정규화 평균값(R,G,B)",
      required: true,
    },
    {
      name: "std",
      placeholder: "각 채널별 정규화 표준편차(R,G,B)",
      required: true,
    },
    {
      name: "inplace",
      placeholder: "입력에 바로 적용할지 여부. 기본값 False",
    },
  ],
  ToTensor: [],
  SequentialTransform: [
    {
      name: "transforms",
      placeholder: "내부에 다른 Transform 객체들 리스트. List[TransformUnion]",
      required: true,
    },
  ],
};
