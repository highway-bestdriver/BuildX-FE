import axios, { AxiosInstance } from "axios";
import { token } from "./token";

interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  result: T;
}

type RequestData = Record<string, unknown>;
type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

// 토큰X 요청
const publicClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

// 토큰O 요청
const privateClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

// 토큰O 요청 - interceptor에 토큰 넣기
privateClient.interceptors.request.use(
  (config) => {
    const accessToken = token.sync();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 토큰O 요청 - 401, 404 인증 에러나면 다시 로그인 시키기
privateClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if ([401, 404].includes(error.response?.status)) {
      token.remove();

      const status = error.response.status;
      if ([404].includes(status)) {
        if (typeof window !== "undefined") {
          window.location.href = "/404";
        }
      } else {
        if (typeof window !== "undefined") {
          window.location.href = "/error";
        }
      }
    }
    return Promise.reject(error);
  }
);

// 클라이언트 헬퍼 함수
const createApiRequest = (client: AxiosInstance) => {
  const request = <T>(method: HttpMethod, url: string, data?: RequestData) =>
    client
      .request<ApiResponse<T>>({ method, url, data })
      .then((response) => response.data);

  return {
    get: <T>(url: string) => request<T>("get", url),
    post: <T>(url: string, data?: RequestData) => request<T>("post", url, data),
    put: <T>(url: string, data?: RequestData) => request<T>("put", url, data),
    patch: <T>(url: string, data?: RequestData) =>
      request<T>("patch", url, data),
    delete: <T>(url: string, data?: RequestData) =>
      request<T>("delete", url, data),
  };
};

export const publicApi = createApiRequest(publicClient);
export const privateApi = createApiRequest(privateClient);
