export const token = {
  // 비동기
  get: async () => {
    if (typeof window === "undefined") {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      return cookieStore.get("accessToken")?.value;
    }
    return token.sync();
  },

  // 동기(클라이언트)
  sync: () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];
  },

  // 클라이언트에서만 가능
  set: (value: string, name: string = "accessToken") => {
    if (typeof window === "undefined") return;
    document.cookie = `${name}=${value}; path=/; max-age=18000`;
  },

  // 클라이언트에서만 가능
  remove: () => {
    if (typeof window === "undefined") return;
    document.cookie =
      "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  },
};
