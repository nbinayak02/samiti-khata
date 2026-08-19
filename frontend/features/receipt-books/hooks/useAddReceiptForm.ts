"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { QUERY_KEYS } from "@/lib/query/query-keys";
import { zodResolver } from "@hookform/resolvers/zod";
import { addReceiptBook } from "../api/receipt.client.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddReceiptBook, addReceiptBookSchema } from "../receiptBook.schema";

export default function useAddReceiptBookForm() {
  const form = useForm({
    resolver: zodResolver(addReceiptBookSchema),
  });

  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationKey: [QUERY_KEYS.ADD_RECEIPT_BOOK],
    mutationFn: addReceiptBook,
    onSuccess: () => {
      toast.success("Receipt Book added successfully");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.RECEIPT_BOOK] });
    },
  });

  const onSubmit = (data: AddReceiptBook) => {
    mutate(data);
  };

  return {
    ...form,
    onSubmit,
    isPending,
    isSuccess,
    isError,
    serverError: error,
  };
}
