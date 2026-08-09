import { toast } from "@/components/ui/toast";
import { useMutation } from "@tanstack/react-query";
import { createCommittee } from "../api/committee.api";
import { MUTATION_KEYS } from "@/constants/mutationKeys";
import type { CommitteeSchema } from "../schemas/committee.schema";

export default function useCreateCommittee() {
    
  const { mutate, isPending } = useMutation({
    mutationFn: createCommittee,
    mutationKey: [MUTATION_KEYS.CREATE, MUTATION_KEYS.COMMITTEE],
    onSuccess: () => {
      toast.add({
        title: "Committee created successfully.",
      });
    },
  });

  const onCreate = (data: CommitteeSchema) => {
    mutate(data);
  };

  return {
    onCreate,
    isPending,
  };
}
