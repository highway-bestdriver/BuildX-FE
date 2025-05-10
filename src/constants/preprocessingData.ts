import { HyperParameter } from "./blockData";

export const preprocessingData: Record<string, HyperParameter[]> = {
  Resize: [
    {
      name: "size",
      placeholder:
        "출력 이미지 크기, int 또는  [height, width] 형태의 List[int]",
      required: true,
      type: "Union[int, List[int]]",
    },
    {
      name: "interpolation",
      placeholder:
        "보간 방식. “bilinear”, “nearest” 등 문자열 or 정수(enum). 기본값 “bilinear”",
      type: "Union[int, str]",
    },
    {
      name: "max_size",
      placeholder: "최대 허용 크기 (size가 int일 때만 적용)",
      type: "int",
    },
    {
      name: "antialias",
      placeholder: "안티앨리어싱 필터 적용 여부. 기본값 True",
      type: "bool",
    },
  ],
  CenterCrop: [
    {
      name: "size",
      placeholder:
        "중심에서 자를 영역 크기. int 또는 [height, width] 형태의 List[int]",
      required: true,
      type: "Union[int, List[int]]",
    },
  ],
  RandomCrop: [
    {
      name: "size",
      placeholder: "자를 크기. int 또는 [height, width]",
      required: true,
      type: "Union[int, List[int]]",
    },
    {
      name: "padding",
      placeholder: "crop 전에 padding 추가. int 또는 [int, int, int, int] 형태",
      type: "Union[int, List[int]]",
    },
    {
      name: "pad_if_needed",
      placeholder: "입력이 작을 경우 padding 추가 여부. 기본값 False",
      type: "bool",
    },
    {
      name: "fill",
      placeholder:
        "패딩 채울 값. int, float, List[int], List[float], None. 기본값 0",
      type: "Union[int, float, List[int], List[float], None, Dict]",
    },
    {
      name: "padding_mode",
      placeholder:
        "“constant”, “edge”, “reflect”, “symmetric”. 기본 “constant”",
      type: "Literal['constant', 'edge', 'reflect', 'symmetric']",
    },
  ],
  RandomHorizontalFlip: [
    {
      name: "p",
      placeholder: "좌우 반전 확률 (0~1). 기본값 0.5",
      type: "float",
    },
  ],
  RandomVerticalFlip: [
    {
      name: "p",
      placeholder: "상하 반전 확률 (0~1). 기본값 0.5",
      type: "float",
    },
  ],
  RandomRotation: [
    {
      name: "degrees",
      placeholder: "회전 각도 범위. float 또는 [min, max] 리스트",
      required: true,
      type: "Union[float, List[float]]",
    },
    {
      name: "interpolation",
      placeholder: "보간 방식. “nearest”, “bilinear”. 기본값 “nearest”",
      type: "Union[int, str]",
    },
    {
      name: "expand",
      placeholder: "회전 후 전체 이미지 보이도록 확장 여부. 기본값 False",
      type: "bool",
    },
    {
      name: "center",
      placeholder: "회전 중심 (x,y). 기본값 None(중앙)",
      type: "List[float]",
    },
    {
      name: "fill",
      placeholder: "회전 후 빈 부분 채울 색. 기본값 0 (검정)",
      type: "Union[int, float, List[int], List[float], None, Dict]",
    },
  ],
  ColorJitter: [
    {
      name: "brightness",
      placeholder: "밝기 조정 범위. float 또는 [min, max] 리스트",
      type: "Union[float, List[float]]",
    },
    {
      name: "contrast",
      placeholder: "대비 조정 범위. float 또는 [min, max] 리스트",
      type: "Union[float, List[float]]",
    },
    {
      name: "saturation",
      placeholder: "채도 조정 범위. float 또는 [min, max] 리스트",
      type: "Union[float, List[float]]",
    },
    {
      name: "hue",
      placeholder: "색조 조정 범위. float 또는 [min, max] 리스트",
      type: "Union[float, List[float]]",
    },
  ],
  Normalize: [
    {
      name: "mean",
      placeholder: "각 채널별 정규화 평균값(R,G,B)",
      required: true,
      type: "List[float]",
    },
    {
      name: "std",
      placeholder: "각 채널별 정규화 표준편차(R,G,B)",
      required: true,
      type: "List[float]",
    },
    {
      name: "inplace",
      placeholder: "입력에 바로 적용할지 여부. 기본값 False",
      type: "bool",
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
