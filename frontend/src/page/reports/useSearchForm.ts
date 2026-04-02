import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import SearchReportSchema from "./report.schema"
import type { TSearchForm } from "./report.type"
import { useQuery } from "@tanstack/react-query"

const useSearchForm = () => {
  const form = useForm({
    resolver: zodResolver(SearchReportSchema),
  })

  const { data, isPending, refetch, isSuccess } = useQuery({
    enabled: false,
    queryKey: ["searchReport"],
    queryFn: () => {
      // Repository search will be implemented
      return Promise.resolve(null)
    },
  })

  const onSubmit: SubmitHandler<TSearchForm> = () => {
    refetch()
  }

  return { ...form, onSubmit, isPending, data, isSuccess }
}

export default useSearchForm
