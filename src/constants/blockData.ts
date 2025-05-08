export const BLOCK_WIDTH = 180;
export const BLOCK_HEIGHT = 30.4;

export const blockData = [
  { label: "Conv2d", color: "bg-yellow-400" },
  { label: "MaxPool2d", color: "bg-green-400" },
  { label: "AvgPool2d", color: "bg-green-400" },
  { label: "AdaptiveAvgPool2d", color: "bg-green-400" },
  { label: "AdaptiveMaxPool2d", color: "bg-green-400" },
  { label: "Linear", color: "bg-pink-500" },
  { label: "Dropout", color: "bg-fuchsia-400" },
  { label: "BatchNorm2d", color: "bg-lime-400" },
  { label: "Flatten", color: "bg-red-400" },
  { label: "Upsample", color: "bg-indigo-200" },
  { label: "ReLU", color: "bg-orange-300" },
  { label: "Dense", color: "bg-pink-500" },
  { label: "concatenate", color: "bg-emerald-300" },
  { label: "LeakyReLU", color: "bg-orange-300" },
  { label: "Sigmoid", color: "bg-orange-400" },
  { label: "Tanh", color: "bg-orange-400" },
  { label: "Softmax", color: "bg-orange-400" },
  { label: "Identity", color: "bg-yellow-300" },
  { label: "ConvTranspose2d", color: "bg-yellow-300" },
];

export type HyperParameter = {
  name: string;
  placeholder: string;
  required?: boolean;
};

export const hyperParameterMap: Record<string, HyperParameter[]> = {
  Conv2d: [
    {
      name: "in_channels",
      placeholder: "입력 채널 수 ex. 3, 6, 9",
      required: true,
    },
    {
      name: "out_channels",
      placeholder: "필터 개수 (출력 채널 수) ex. 32, 64, 128",
      required: true,
    },
    {
      name: "kernel_size",
      placeholder: "커널 크기 ex. 3, [3,3]",
      required: true,
    },
    { name: "stride", placeholder: "필터 이동 간격 ex. 1" },
    { name: "padding", placeholder: "입력 가장자리 패딩 크기 ex. same, (int)" },
    { name: "dilation", placeholder: "커널 요소 간 간격" },
    { name: "groups", placeholder: "depthwise conv에 사용" },
    { name: "bias", placeholder: "bias 사용 여부 true | false" },
  ],
  MaxPool2d: [
    {
      name: "kernel_size",
      placeholder: "풀링 영역 크기 ex. 2, [2,2]",
      required: true,
    },
    { name: "stride", placeholder: "이동 간격 ex. 2, [2,2]" },
    { name: "padding", placeholder: "가장자리 패딩 크기 ex. 0, 1" },
    { name: "dilation", placeholder: "확장된 풀링 영역 간격 ex. 0, 1" },
    { name: "return_indicies", placeholder: "true (인덱스 반환) | false" },
    { name: "ceil_mode", placeholder: "출력 크기 올림 사용 여부 true | false" },
  ],
  AvgPool2d: [
    {
      name: "kernel_size",
      placeholder: "풀링 영역 크기 ex. 2, [2,2]",
      required: true,
    },
    { name: "stride", placeholder: "이동 간격 ex. 2, [2,2]" },
    { name: "padding", placeholder: "가장자리 패딩 크기 ex. 0, 1" },
    { name: "ceil_mode", placeholder: "출력 크기 올림 사용 여부 true | false" },
    {
      name: "count_include_pad",
      placeholder: "평균 계산에 패딩 포함 여부 true | false",
    },
    {
      name: "divisor_override",
      placeholder: "평균 계산 시 분모 직접 지정 ex. 2, 4",
    },
  ],
  AdaptiveAvgPool2d: [
    {
      name: "output_size",
      placeholder: "출력 크기 ex. 1, [1, 1]",
      required: true,
    },
  ],
  AdaptiveMaxPool2d: [
    {
      name: "output_size",
      placeholder: "출력 크기 ex. 2, [2, 2]",
      required: true,
    },
  ],
  Linear: [
    {
      name: "in_features",
      placeholder: "입력 차원 ex. 128, 256",
      required: true,
    },
    {
      name: "out_features",
      placeholder: "출력 차원 (노드 수) ex. 10, 100",
      required: true,
    },
    { name: "bias", placeholder: "bias 사용 여부 true | false" },
  ],
  Dropout: [{ name: "p", placeholder: "드롭아웃 확률 (0~1) ex. 0.2, 0.5" }],
  BatchNorm2d: [
    {
      name: "num_features",
      placeholder: "입력 채널 수 ex. 32, 64, 128",
      required: true,
    },
    { name: "eps", placeholder: "0으로 나누는 것을 방지하는 값 ex. 0.001" },
    { name: "momentum", placeholder: "러닝 평균 업데이트 비율 ex. 0.99" },
    {
      name: "affine",
      placeholder: "학습 가능한 scale/shift 사용 여부 true | false",
    },
    {
      name: "track_running_stats",
      placeholder: "학습 중 running mean/var 추적 여부 true | false",
    },
  ],
  Flatten: [
    { name: "start_dim", placeholder: "시작 차원 ex. 1" },
    { name: "end_dim", placeholder: "끝 차원 ex. -1" },
  ],
  Upsample: [
    { name: "scale_factor", placeholder: "크기 확대 비율 ex. 2.0" },
    {
      name: "mode",
      placeholder: "업샘플링 방식 ex. nearest, bilinear",
      required: true,
    },
    {
      name: "align_corners",
      placeholder: "보간 방식에서 꼭짓점 정렬 여부 true | false",
    },
  ],
  ReLU: [
    {
      name: "inplace",
      placeholder: "메모리 절약을 위한 제자리 연산 여부 true | false",
    },
  ],
  LeakyReLU: [
    {
      name: "negative_slpoe",
      placeholder: "음수 영역 기울기 ex. 0.01",
    },
    {
      name: "inplace",
      placeholder: "메모리 절약을 위한 제자리 연산 여부 true | false",
    },
  ],
  Softmax: [
    {
      name: "dim",
      placeholder: "Softmax 연산을 수행할 축 ex. 1",
      required: true,
    },
  ],
  ConvTranspose2d: [
    {
      name: "in_channels",
      placeholder: "입력 채널 수 ex. 3, 6, 9",
      required: true,
    },
    {
      name: "out_channels",
      placeholder: "필터 개수 (출력 채널 수) ex. 32, 64, 128",
      required: true,
    },
    {
      name: "kernel_size",
      placeholder: "커널 크기 ex. 3, [3,3]",
      required: true,
    },
    { name: "stride", placeholder: "필터 이동 간격 ex. 1" },
    { name: "padding", placeholder: "입력에 적용된 패딩 크기 ex. same, (int)" },
    { name: "output_padding", placeholder: "출력 텐서 크기 보정 ex. 1" },
    { name: "groups", placeholder: "그룹 수 ex. 1" },
    { name: "bias", placeholder: "bias 사용 여부 true | false" },
    { name: "dilation", placeholder: "커널 요소 간 간격" },
  ],
};
