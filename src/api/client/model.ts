import { privateApi } from "@api/client";

export const modelApi = {
  // 코드 생성하기
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  generateCode: async (body: any) => {
    const response = await privateApi.post<{ code: string }>(
      `/code/generate`,
      body
    );
    return response;
  },

  // 코드 피드백
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  feedbackCode: async (body: any) => {
    const response = await privateApi.post<{ feedback: string }>(
      `/code/feedback`,
      body
    );
    return response;
  },
};
