"use server";

import { apiClient } from "@/common/services/api/server-client";

export async function getNotificationTemplatesAction() {
  const result = await apiClient.callRoute("/notification-templates", {
    method: "get",
  });
  return result;
}
