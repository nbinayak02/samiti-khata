import { useEffect, useState } from "react";
import { createUser } from "../api/user.client.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addUserSchema } from "../schema/addUser.schema";
import { SignupDto } from "@/api/types";

export default function useAddUser() {
  const queryClient = useQueryClient();
  const [serverError, setServerError] = useState<string | null>(null);

  const { mutate, isError, isPending, isSuccess } = useMutation({
    mutationKey: ["add-user"],
    mutationFn: createUser,
    onSuccess: () => {
      toast.success("User Created Successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      setServerError(error.message);
    },
  });

  useEffect(() => {
    console.log({ isError, isPending, isSuccess });
  }, [isError, isPending, isSuccess]);

  const form = useForm({
    resolver: zodResolver(addUserSchema),
  });

  const addUser = (data: SignupDto) => {
    console.log({ data });
    mutate(data);
  };

  return {
    ...form,
    addUser,
    isError,
    isPending,
    isSuccess,
    serverError,
  };
}
