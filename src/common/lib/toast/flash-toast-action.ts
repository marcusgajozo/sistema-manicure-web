"use server";

import { consumeFlashToast } from "./flash-toast";

export async function consumeFlashToastAction() {
  return consumeFlashToast();
}
