import { privateApi, publicApi } from "@api/client";

export const modelApi = {
  // 코드 생성하기
  generateCode: async (body: any) => {
    const response = await privateApi.post<{ code: string }>(
      `/code/generate`,
      body
    );
    return response;
  },

  // 코드 돌리기
  runCode: async () => {},

  // 코드 피드백
  feedbackCode: async (body: any) => {
    const response = await privateApi.post<{}>(`/code/feedback`, body);
    return response;
  },
};
