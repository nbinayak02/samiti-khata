import makeRequest from "@/lib/api/server.client";
import { BackendResponse } from "../types";
import { Organization } from "./components/organizations-column";

export async function getOrganizations(): Promise<Organization[]> {
  try {
    const res = await makeRequest<BackendResponse<Organization[]>>(
      "/organization",
      { cache: "no-store" },
    );
    return res.data;
  } catch (err: Error | unknown) {
    throw new Error("Failed to fetch organizations.");
  }
}
