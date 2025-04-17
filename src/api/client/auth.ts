import { privateApi, publicApi } from "@api/client";

export const authApi = {
  postSignup: (
    username: string,
    name: string,
    phone: string,
    password: string
  ) => {
    const response = publicApi.post<{ token: string }>(`/auth/signup/`, {
      username: username,
      name: name,
      phone: phone,
      password: password,
    });
    return response;
  },

  postLogin: (username: string, password: string) => {
    const response = publicApi.post<{ token: string }>(`/auth/login/`, {
      username: username,
      password: password,
    });
    return response;
  },

  postLogout: () => {
    const response = privateApi.post<{ token: string }>(`/auth/logout/`);
    return response;
  },
};
