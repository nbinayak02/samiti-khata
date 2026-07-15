import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/query/query-keys";
import { getFiscalYears } from "../api/fiscalYear.client.api";

export default function useGetFiscalYear() {
  return useQuery({
    queryKey: [QUERY_KEYS.FISCAL_YEAR],
    queryFn: getFiscalYears,
  });
}
