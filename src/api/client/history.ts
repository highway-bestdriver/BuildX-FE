import { privateApi } from "@api/client";

export type DashboardItem = {
  id: number;
  name: string;
  last_modified: string;
};

export const historyApi = {
  // 코드 생성하기
  getDashboard: async () => {
    const response = await privateApi.get<DashboardItem[]>(`/dashboard`);
    return response;
  },
};
