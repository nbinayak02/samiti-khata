import { isAxiosError } from "axios";
import { login } from "../api/auth.api";
import { toast } from "@/components/ui/toast";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { MUTATION_KEYS } from "@/constants/mutationKeys";
import type { LoginSchema } from "../schemas/login.schema";

export default function useLoginMutation() {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: [MUTATION_KEYS.LOGIN],
    mutationFn: login,
    onSuccess: () => {
      toast.add({
        type: "success",
        description: "Login Successful.",
      });
      navigate({ to: "/dashboard", replace: true });
    },
    onError: (error) => {
      let description = "Something went wrong!";

      if (isAxiosError(error)) {
        description = error.response?.data.message;
      }

      toast.add({
        type: "error",
        title: "Failed to Login.",
        description,
      });
    },
  });

  const doLogin = (data: LoginSchema) => {
    mutate(data);
  };

  return {
    isPending,
    doLogin,
  };
}
