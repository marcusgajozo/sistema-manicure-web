export const AUTH_COOKIES = {
  accessToken: "access_token",
  refreshToken: "refresh_token",
} as const;

export const ACCESS_TOKEN_COOKIE = AUTH_COOKIES.accessToken;

export const AUTH_API_PATHS = {
  refresh: "/authentication/refresh",
} as const;
