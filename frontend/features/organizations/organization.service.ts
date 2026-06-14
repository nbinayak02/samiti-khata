import makeRequest from "@/lib/api/server.client";
import { BackendResponse } from "../types";
import { Organization } from "./organizations-column";

export async function getOrganizations() {
  try {
    const res =
      await makeRequest<BackendResponse<Organization>>("/organization");
    return res.data;
  } catch (error: unknown) {
    console.log({ error });
    return null;
  }
}
