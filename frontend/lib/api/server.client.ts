"use server";
import { cookies } from "next/headers";

export default async function makeRequest<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const cookieStore = await cookies();
  const cks = cookieStore.toString();

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/api/v2";

  const response = await fetch(`${baseUrl}${url}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: cks,
      ...(options?.headers || {}),
    },
  });

  const res = await response.json();

  if (!response.ok) throw new Error(res.message);

  return res;
}
