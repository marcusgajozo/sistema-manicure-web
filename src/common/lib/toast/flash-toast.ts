import "server-only";

import { cookies } from "next/headers";

const FLASH_TOAST_COOKIE = "flash-toast";

export async function setFlashToast(message: string) {
  const cookieStore = await cookies();

  cookieStore.set(FLASH_TOAST_COOKIE, message, {
    path: "/",
    maxAge: 60,
  });
}

export async function readFlashToast() {
  const cookieStore = await cookies();
  return cookieStore.get(FLASH_TOAST_COOKIE)?.value ?? null;
}

export async function consumeFlashToast() {
  const cookieStore = await cookies();
  const message = cookieStore.get(FLASH_TOAST_COOKIE)?.value ?? null;

  if (message) {
    cookieStore.delete(FLASH_TOAST_COOKIE);
  }

  return message;
}
