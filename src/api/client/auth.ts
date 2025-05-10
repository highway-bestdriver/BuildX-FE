import { publicApi } from "@api/client";

export const authApi = {
  // 회원가입
  postSignup: async (
    username: string,
    name: string,
    phone: string,
    password: string
  ) => {
    const response = publicApi.post(`/auth/signup`, {
      username: username,
      name: name,
      phone: phone,
      password: password,
    });
    return response;
  },

  // 로그인
  postLogin: async (username: string, password: string) => {
    const response = publicApi.post<{
      access_token: string;
      refresh_token: string;
    }>(`/auth/login`, {
      username: username,
      password: password,
    });
    return response;
  },
};
