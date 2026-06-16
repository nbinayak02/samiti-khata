import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import loginSchema, { TLoginSchema } from "../schema/login.zod";
import { axiosInstance } from "@/lib/api/browser.client";
import CustomError from "@/lib/error/customError";
import { useState } from "react";

export default function useLogin() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<TLoginSchema>({ resolver: zodResolver(loginSchema) });

  const onSubmit: SubmitHandler<TLoginSchema> = async (formData) => {
    // tanstack query is not use here so handle states and errors manually
    try {
      setLoading(true);
      const response = await axiosInstance.post("/auth/login", formData);
      setSuccess(response.data.success);
    } catch (error: CustomError | Error | any) {
      setError(error.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return { ...form, onSubmit, serverError: error, success, loading };
}
