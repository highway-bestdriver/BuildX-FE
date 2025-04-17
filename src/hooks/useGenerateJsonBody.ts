import { useBlockStore } from "@store/useModelStore";

export default function useGenerateJsonBody() {
  const { blockSettings } = useBlockStore.getState();

  const layers = Object.values(blockSettings).map(
    ({ id, type, input, params }) => {
      const parsedParams: Record<
        string,
        string | number | boolean | string[] | number[]
      > = {};

      Object.entries(params).forEach(([key, value]) => {
        try {
          parsedParams[key] = JSON.parse(value); // JSON.parse로 자동 형 변환
        } catch {
          parsedParams[key] = value; // 실패 시 문자열 그 자체
        }
      });

      return {
        id,
        type,
        ...(input ? { input } : {}),
        ...parsedParams,
      };
    }
  );

  return layers;
}
