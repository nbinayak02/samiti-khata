import { zodResolver } from "@hookform/resolvers/zod"
import { useAppDispatch } from "@/hooks/typeSafeReduxHooks"
import { useForm, type SubmitHandler } from "react-hook-form"
import { createCommitteeSchema, type TCreateCommittee } from "../model/schema"
import { createCommittee } from "../committee.slice"

export const useCreateCommittee = () => {
  const dispatch = useAppDispatch()
  const form = useForm({ resolver: zodResolver(createCommitteeSchema) })

  const onSubmit: SubmitHandler<TCreateCommittee> = async (
    data: TCreateCommittee
  ) => {
    dispatch(createCommittee(data))
  }

  return {
    ...form,
    onSubmit,
  }
}
