import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  type HttpTransport,
  HttpTransportError,
  type HttpTransportRequest,
  type HttpTransportResponse,
} from "typed-route-client/core";

import { APP_ROUTES } from "@/common/lib/navigation/routes";
import { setFlashToast } from "@/common/lib/toast/flash-toast";

export type ApiRequestContext = {
  showToast?: boolean;
  skipAuthRedirect?: boolean;
};

type TransportRequest = Omit<HttpTransportRequest, "context"> & {
  context?: ApiRequestContext;
};

function getApiBaseUrl() {
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    throw new Error(
      "API_URL is not set. Example: API_URL=http://172.17.0.1:3000",
    );
  }

  return apiUrl.endsWith("/") ? apiUrl.slice(0, -1) : apiUrl;
}

async function buildRequestCookieHeader() {
  const cookieStore = await cookies();

  return cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
}

async function applyResponseCookies(response: Response) {
  const setCookieHeaders =
    typeof response.headers.getSetCookie === "function"
      ? response.headers.getSetCookie()
      : [];

  if (setCookieHeaders.length === 0) {
    return;
  }

  const cookieStore = await cookies();

  for (const header of setCookieHeaders) {
    const [nameValue, ...attributes] = header
      .split(";")
      .map((part) => part.trim());
    const separatorIndex = nameValue.indexOf("=");
    const name = nameValue.slice(0, separatorIndex);
    const value = nameValue.slice(separatorIndex + 1);
    const options: {
      httpOnly?: boolean;
      secure?: boolean;
      path?: string;
      maxAge?: number;
      sameSite?: "lax" | "strict" | "none";
      expires?: Date;
    } = {};

    for (const attribute of attributes) {
      const [rawKey, rawValue] = attribute.includes("=")
        ? attribute.split("=")
        : [attribute, "true"];
      const key = rawKey.toLowerCase();

      if (key === "httponly") options.httpOnly = true;
      if (key === "secure") options.secure = true;
      if (key === "path") options.path = rawValue;
      if (key === "max-age") options.maxAge = Number(rawValue);
      if (key === "samesite") {
        options.sameSite = rawValue.toLowerCase() as "lax" | "strict" | "none";
      }
      if (key === "expires") options.expires = new Date(rawValue);
    }

    cookieStore.set(name, value, options);
  }
}

export function readHttpErrorMessage(error: unknown, fallback: string) {
  if (error instanceof HttpTransportError) {
    return readErrorMessage(error.data, fallback);
  }

  return fallback;
}

function readErrorMessage(data: unknown, fallback: string) {
  if (typeof data === "object" && data !== null && "message" in data) {
    const { message } = data as { message: string | string[] };

    if (typeof message === "string") {
      return message;
    }

    if (Array.isArray(message)) {
      return message.join(", ");
    }
  }

  return fallback;
}

async function executeFetch(
  baseUrl: string,
  req: TransportRequest,
): Promise<Response> {
  const cookieHeader = await buildRequestCookieHeader();
  const url = new URL(req.url, `${baseUrl}/`);

  if (req.queryParams) {
    for (const [key, value] of Object.entries(req.queryParams)) {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return fetch(url, {
    method: req.method.toUpperCase(),
    headers: {
      "Content-Type": "application/json",
      ...req.headers,
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    body:
      req.body === undefined || req.body === null
        ? undefined
        : JSON.stringify(req.body),
    cache: "no-store",
  });
}

export function createServerHttpTransport(): HttpTransport<ApiRequestContext> {
  const baseUrl = getApiBaseUrl();

  return {
    async request(req: TransportRequest): Promise<HttpTransportResponse> {
      const response = await executeFetch(baseUrl, req);

      if (response.status === 401 && !req.context?.skipAuthRedirect) {
        redirect(APP_ROUTES.login);
      }

      await applyResponseCookies(response);

      const contentType = response.headers.get("content-type") ?? "";
      const data =
        response.status === 204 || !contentType.includes("application/json")
          ? undefined
          : await response.json();

      if (!response.ok) {
        if (req.context?.showToast !== false) {
          await setFlashToast(
            readErrorMessage(data, "Ocorreu um erro. Tente novamente."),
          );
        }

        throw new HttpTransportError({
          status: response.status,
          data,
          raw: data,
          message: readErrorMessage(data, "HTTP request failed"),
        });
      }

      return {
        status: response.status,
        data,
      };
    },
  };
}
