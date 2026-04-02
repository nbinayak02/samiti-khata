import { useAppDispatch } from "@/hooks/typeSafeReduxHooks"
import createOrganizationSchema, {
  type TCreateOrganization,
} from "./organization.schema"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createOrganization } from "./organization.slice"

const useCreateOrganization = () => {
  const dispatch = useAppDispatch()
  const form = useForm({ resolver: zodResolver(createOrganizationSchema) })

  const onSubmit: SubmitHandler<TCreateOrganization> = async (
    data: TCreateOrganization
  ) => {
    dispatch(createOrganization(data))
  }

  return {
    ...form,
    onSubmit,
  }
}

export default useCreateOrganization
