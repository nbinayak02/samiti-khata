import { toast } from "@/components/ui/toast";
import { useMutation } from "@tanstack/react-query";
import { ACTIONS, MODULES } from "@/constants/constants";
import { createReceiptBook } from "../api/receipt-books.api";
import type { ReceiptBookSchema } from "../schemas/receipt-books.schema";

export default function useCreateReceiptBook() {
  const { mutate, isPending } = useMutation({
    mutationFn: createReceiptBook,
    mutationKey: [ACTIONS.CREATE, MODULES.RECEIPT_BOOK],
    onSuccess: () => {
      toast.add({
        title: "Receipt Book created successfully.",
      });
    },
  });

  const onCreate = (data: ReceiptBookSchema) => {
    mutate(data);
  };

  return {
    onCreate,
    isPending,
  };
}
