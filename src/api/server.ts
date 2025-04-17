import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  result: T;
}

type RequestData = Record<string, unknown>;
type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

// 서버용 Axios 인스턴스 생성
const serverClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

// 서버 헬퍼 함수
function createApiRequest(client: AxiosInstance) {
  const request = async <T>(
    method: HttpMethod,
    url: string,
    data?: RequestData
  ) => {
    // 쿠키에서 토큰 추출
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    // 요청 config 세팅
    const config: AxiosRequestConfig = { method, url, data };
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }

    // 요청 후 401, 404 처리
    try {
      const response = await client.request<ApiResponse<T>>(config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        if ([401].includes(status)) {
          redirect("/");
        } else if ([404].includes(status)) {
          notFound();
        } else {
          throw new Error("Server error: " + status);
        }
      }
      throw error;
    }
  };

  return {
    get: <T>(url: string) => request<T>("get", url),
    post: <T>(url: string, data?: RequestData) => request<T>("post", url, data),
    put: <T>(url: string, data?: RequestData) => request<T>("put", url, data),
    patch: <T>(url: string, data?: RequestData) =>
      request<T>("patch", url, data),
    delete: <T>(url: string, data?: RequestData) =>
      request<T>("delete", url, data),
  };
}

export const serverApi = createApiRequest(serverClient);
