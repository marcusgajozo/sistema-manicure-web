"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ACCESS_TOKEN_COOKIE } from "@/common/lib/auth/constants";
import { APP_ROUTES } from "@/common/lib/navigation/routes";

export async function signOutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_COOKIE);

  redirect(APP_ROUTES.login);
}
