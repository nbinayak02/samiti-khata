"use client";
import { toast } from "sonner";
import { createOrganization } from "../api/organization.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addOrganizationSchema } from "../schema/addOrganization.schema";
import { OrganizationDto } from "@/api/types";
import { useEffect, useState } from "react";

export default function useAddOrganization() {
  const queryClient = useQueryClient();
  const [serverError, setServerError] = useState<string | null>(null);

  const { mutate, isError, isPending, isSuccess } = useMutation({
    mutationKey: ["add-organization"],
    mutationFn: createOrganization,
    onSuccess: () => {
      toast.success("Organization Created Successfully");
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
    onError: (error) => {
      setServerError(error.message);
    },
  });

  useEffect(() => {
    console.log({ isError, isPending, isSuccess });
  }, [isError, isPending, isSuccess]);

  const form = useForm({
    resolver: zodResolver(addOrganizationSchema),
  });

  const addOrganization = (data: OrganizationDto) => {
    console.log({ data });
    mutate(data);
  };

  return {
    ...form,
    addOrganization,
    isError,
    isPending,
    isSuccess,
    serverError,
  };
}
