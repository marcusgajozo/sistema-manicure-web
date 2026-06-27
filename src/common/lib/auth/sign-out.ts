"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AUTH_COOKIES } from "@/common/lib/auth/cookies";
import { APP_ROUTES } from "@/common/lib/navigation/routes";

export async function signOutAction() {
  const cookieStore = await cookies();

  cookieStore.delete(AUTH_COOKIES.accessToken);
  cookieStore.delete(AUTH_COOKIES.refreshToken);

  redirect(APP_ROUTES.login);
}
