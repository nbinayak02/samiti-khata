import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import SearchReportSchema from "./report.schema"
import type { TSearchForm } from "./report.type"
import { QueryClient, useMutation } from "@tanstack/react-query"
import ReportRepository from "./report.repository"

const useSearchForm = () => {
  const queryClient = new QueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TSearchForm) => ReportRepository.search(data),
    onSuccess: (data) => {
      console.log("Search Income Report successful with response:", data)
      queryClient.invalidateQueries({ queryKey: ["incomeReport"] })
    },
  })

  const form = useForm({
    resolver: zodResolver(SearchReportSchema),
  })

  const onSubmit: SubmitHandler<TSearchForm> = (data) => {
    mutate(data)
  }

  return { ...form, onSubmit, isPending }
}

export default useSearchForm
