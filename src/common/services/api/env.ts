function trimTrailingSlash(url: string) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export function getApiBaseUrl() {
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    throw new Error(
      "API_URL is not set. Example: API_URL=http://172.17.0.1:3000",
    );
  }

  return trimTrailingSlash(apiUrl);
}
