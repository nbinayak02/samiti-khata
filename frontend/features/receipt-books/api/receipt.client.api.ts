import { axiosInstance } from "@/lib/api/browser.client";
import { AddReceiptBook } from "../receiptBook.schema";
import { BackendResponse } from "@/features/shared.types";

export async function addReceiptBook(
  receiptBook: AddReceiptBook,
): Promise<BackendResponse<AddReceiptBook>> {
  return await axiosInstance.post("/receipt-book", receiptBook);
}
