import makeRequest from "@/lib/api/server.client";
import { BackendResponse } from "../../shared.types";
import { User } from "../types";

export async function getMe() {
  try {
    const res = await makeRequest<BackendResponse<User>>("/auth/me", {
      method: "GET",
    });
    return res.data;
  } catch (error: any) {
    console.log({ error });
    return null;
  }
}
