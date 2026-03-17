import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { createCommitteeSchema, type TCreateCommittee } from "../model/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import getErrorMessage from "@/lib/error-utils"
import { createCommittee } from "../service/committee.service"

export const useCreateCommittee = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isTaskComplete, setIsTaskComplete] = useState(false)
  const [data, setData] = useState<TCreateCommittee | null>(null)

  const form = useForm({ resolver: zodResolver(createCommitteeSchema) })

  const onSubmit: SubmitHandler<TCreateCommittee> = async (
    data: TCreateCommittee
  ) => {
    try {
      setIsLoading(true)
      toast.loading("Creating committee...", { id: "create-committee" })

      const response = await createCommittee(data)
      setData(response.data)
      console.log("Committee created successfully:", response.data)

      toast.dismiss("create-committee")
      toast.success("Committee created successfully")
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setIsLoading(false)
      setIsTaskComplete(true)
    }
  }

  return {
    ...form,
    onSubmit,
    isLoading,
    data,
    isTaskComplete,
    setIsTaskComplete,
  }
}
