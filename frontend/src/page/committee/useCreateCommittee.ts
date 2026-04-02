import { zodResolver } from "@hookform/resolvers/zod"
import { useAppDispatch } from "@/hooks/typeSafeReduxHooks"
import { useForm, type SubmitHandler } from "react-hook-form"
import { createCommitteeSchema, type TCreateCommittee } from "./schema"
import { createCommittee } from "./committee.slice"

export const useCreateCommittee = () => {
  const dispatch = useAppDispatch()
  const form = useForm({ resolver: zodResolver(createCommitteeSchema) })

  const onSubmit: SubmitHandler<TCreateCommittee> = async (
    data: TCreateCommittee
  ) => {
    // console.log("Submitting committee data:", data)
    dispatch(createCommittee(data))
  }

  return {
    ...form,
    onSubmit,
  }
}


