import { privateApi } from "@api/client";

export type DashboardItem = {
  id: number;
  name: string;
  last_modified: string;
};

export type DashboardDetail = {
  id: number;
  name: string;
  date: string;
  details: {
    id: number;
    epoch: number;
    batch_size: number;
    learning_rate: number;
    loss: number;
    accuracy: number;
    date: string;
  }[];
};

export const historyApi = {
  // 대시보드 조회
  getDashboard: async () => {
    const response = await privateApi.get<DashboardItem[]>(`/dashboard`);
    return response;
  },

  // 대시보드 상세 조회
  getDashboardDetail: async (id: number) => {
    const response = await privateApi.get<DashboardDetail>(`/dashboard/${id}`);
    return response;
  },
};
