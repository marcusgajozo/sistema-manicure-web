import "server-only";

import { cookies } from "next/headers";
import {
  type HttpTransport,
  HttpTransportError,
  type HttpTransportRequest,
  type HttpTransportResponse,
} from "typed-route-client/core";

import { getApiBaseUrl } from "./env";

type ParsedSetCookie = {
  name: string;
  value: string;
  httpOnly?: boolean;
  secure?: boolean;
  path?: string;
  maxAge?: number;
  sameSite?: "lax" | "strict" | "none";
  expires?: Date;
};

function parseSetCookieHeader(header: string): ParsedSetCookie {
  const parts = header.split(";").map((part) => part.trim());
  const [nameValue, ...attributes] = parts;
  const separatorIndex = nameValue.indexOf("=");

  const name = nameValue.slice(0, separatorIndex);
  const value = nameValue.slice(separatorIndex + 1);
  const options: Omit<ParsedSetCookie, "name" | "value"> = {};

  for (const attribute of attributes) {
    const [rawKey, rawValue] = attribute.includes("=")
      ? attribute.split("=")
      : [attribute, "true"];
    const key = rawKey.toLowerCase();

    if (key === "httponly") {
      options.httpOnly = true;
    }

    if (key === "secure") {
      options.secure = true;
    }

    if (key === "path") {
      options.path = rawValue;
    }

    if (key === "max-age") {
      options.maxAge = Number(rawValue);
    }

    if (key === "samesite") {
      options.sameSite = rawValue.toLowerCase() as ParsedSetCookie["sameSite"];
    }

    if (key === "expires") {
      options.expires = new Date(rawValue);
    }
  }

  return { name, value, ...options };
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
    const parsed = parseSetCookieHeader(header);
    cookieStore.set(parsed.name, parsed.value, {
      httpOnly: parsed.httpOnly,
      secure: parsed.secure,
      path: parsed.path,
      maxAge: parsed.maxAge,
      sameSite: parsed.sameSite,
      expires: parsed.expires,
    });
  }
}

async function buildRequestCookieHeader() {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
}

async function parseResponseData(response: Response) {
  if (response.status === 204) {
    return undefined;
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    return undefined;
  }

  return response.json();
}

export function createServerHttpTransport(): HttpTransport {
  const baseUrl = getApiBaseUrl();

  return {
    async request(req: HttpTransportRequest): Promise<HttpTransportResponse> {
      const cookieHeader = await buildRequestCookieHeader();
      const url = new URL(req.url, `${baseUrl}/`);

      if (req.queryParams) {
        for (const [key, value] of Object.entries(req.queryParams)) {
          if (value !== undefined && value !== null) {
            url.searchParams.set(key, String(value));
          }
        }
      }

      const response = await fetch(url, {
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

      await applyResponseCookies(response);

      const data = await parseResponseData(response);

      if (!response.ok) {
        throw new HttpTransportError({
          status: response.status,
          data,
          raw: data,
          message:
            typeof data === "object" &&
            data !== null &&
            "message" in data &&
            typeof data.message === "string"
              ? data.message
              : "HTTP request failed",
        });
      }

      return {
        status: response.status,
        data,
      };
    },
  };
}
