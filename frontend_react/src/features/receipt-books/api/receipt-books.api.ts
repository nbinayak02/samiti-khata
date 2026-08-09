import axiosInstance from "@/lib/axios";
import type { ReceiptBookSchema } from "../schemas/receipt-books.schema";

export async function createReceiptBook(data: ReceiptBookSchema) {
  const response = await axiosInstance.post(`/receipt-book`, data);
  return response.data.data;
}
