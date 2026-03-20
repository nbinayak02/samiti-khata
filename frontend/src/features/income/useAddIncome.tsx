import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import incomeSchema, { type TIncomeFormData } from "./income.schema"

const useAddIncome = () => {
  const form = useForm({
    resolver: zodResolver(incomeSchema),
  })

  const onSubmit = (data: TIncomeFormData) => {
    console.log(data)
  }

  return { ...form, onSubmit }
}

export default useAddIncome
