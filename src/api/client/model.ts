import { privateApi } from "@api/client";

export const modelApi = {
  generateCode: async (body: any) => {
    const response = await privateApi.post<{ code: string }>(
      `/code/generate`,
      body
    );
    return response;
  },
};
