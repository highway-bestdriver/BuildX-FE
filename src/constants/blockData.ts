export const BLOCK_WIDTH = 180;
export const BLOCK_HEIGHT = 30.4;

export const blockData = [
  { label: "Conv2D", color: "bg-yellow-400" },
  { label: "Pooling", color: "bg-green-400" },
  { label: "Dense", color: "bg-pink-500" },
  { label: "BatchNorm", color: "bg-lime-400" },
  { label: "Dropout", color: "bg-fuchsia-400" },
  { label: "Flatten", color: "bg-red-400" },
  { label: "upsampling", color: "bg-indigo-200" },
  { label: "concatenate", color: "bg-emerald-300" },
  { label: "relu", color: "bg-orange-300" },
  { label: "leaky relu", color: "bg-orange-300" },
  { label: "softmax", color: "bg-orange-400" },
  { label: "sigmoid", color: "bg-orange-400" },
  { label: "tanh", color: "bg-orange-400" },
  { label: "linear", color: "bg-orange-400" },
  { label: "Add", color: "bg-yellow-300" },
  { label: "DepthwiseConv2D", color: "bg-yellow-300" },
];

export type HyperParameter = {
  name: string;
  placeholder: string;
};

export const hyperParameterMap: Record<string, HyperParameter[]> = {
  Conv2D: [
    { name: "filters", placeholder: "ex. 32, 64, 128" },
    { name: "kernel_size", placeholder: "ex. [3,3]" },
    { name: "strides", placeholder: "ex. [1,1]" },
    { name: "padding", placeholder: "valid | same" },
    { name: "activation", placeholder: "relu | sigmoid | tanh | linear" },
    { name: "dilation_rate", placeholder: "ex. [1,1]" },
    { name: "use_bias", placeholder: "true | false" },
  ],
  Pooling: [
    { name: "pooling_type", placeholder: "max | avg" },
    { name: "pooling_size", placeholder: "ex. [2,2]" },
    { name: "strides", placeholder: "ex. [2,2]" },
    { name: "padding", placeholder: "valid | same" },
  ],
  Dense: [
    { name: "units", placeholder: "ex. 128, 256" },
    { name: "activation", placeholder: "relu | sigmoid | tanh | linear" },
    { name: "use_bias", placeholder: "true | false" },
  ],
  BatchNorm: [
    { name: "axis", placeholder: "-1 | 1 | 2" },
    { name: "momentum", placeholder: "ex. 0.99" },
    { name: "epsilon", placeholder: "ex. 0.001" },
  ],
  Dropout: [
    { name: "rate", placeholder: "ex. 0.2, 0.5" },
    { name: "seed", placeholder: "숫자 입력" },
  ],
  upsampling: [{ name: "size", placeholder: "ex. [2,2]" }],
  concatenate: [{ name: "axis", placeholder: "ex. -1" }],
  Add: [{ name: "connection", placeholder: "ex. residual" }],
  DepthwiseConv2D: [
    { name: "kernel_size", placeholder: "ex. [3,3]" },
    { name: "depth_multiplier", placeholder: "ex. 1" },
    { name: "activation", placeholder: "relu | sigmoid | tanh | linear" },
    { name: "padding", placeholder: "valid | same" },
  ],
};
