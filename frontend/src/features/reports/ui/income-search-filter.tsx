import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useQuery } from "@tanstack/react-query"
import IncomeReportTable from "./income-report-table"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import committeeRepository from "@/features/committee/service/committee.service"
import billIssuerRepository from "@/features/bill-issuer/billIssuer.repository"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAppDispatch, useAppSelector } from "@/hooks/typeSafeReduxHooks"
import { clearAllFilters, setFilter } from "../income.report.slice"
import { useDebounce } from "@/hooks/useDebounce"
import ReportRepository from "../report.repository"
import NepaliDateInput from "@/components/common/nepali-date-input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

type SearchType = "name" | "document"

const IncomeSearch = () => {
  const [searchType, setSearchType] = useState<SearchType>("document")
  const dispatch = useAppDispatch()

  const { data: committees } = useQuery({
    queryKey: ["committees"],
    queryFn: committeeRepository.fetchAllByOrganization,
  })

  const { data: billIssuers } = useQuery({
    queryKey: ["billIssuers"],
    queryFn: billIssuerRepository.getBillIssuersByOrganization,
  })

  const filterCommitteeId = useAppSelector(
    (state) => state.incomeReport.committeeId
  )

  const filterName = useAppSelector((state) => state.incomeReport.name)
  const filterBillNumber = useAppSelector(
    (state) => state.incomeReport.billNumber
  )
  const filterBookNumber = useAppSelector(
    (state) => state.incomeReport.bookNumber
  )
  const filterFromDate = useAppSelector((state) => state.incomeReport.fromDate)
  const filterToDate = useAppSelector((state) => state.incomeReport.toDate)
  const filterBillIssuerId = useAppSelector(
    (state) => state.incomeReport.billIssuerId
  )

  const { data, isSuccess, isPending } = useQuery({
    queryKey: [
      "incomeReport",
      {
        filterCommitteeId,
        filterName,
        filterBillNumber,
        filterBookNumber,
        filterFromDate,
        filterToDate,
        filterBillIssuerId,
      },
    ],
    queryFn: () =>
      ReportRepository.search({
        isSearchByDocument: String(searchType === "document"),
        committeeId: filterCommitteeId,
        name: filterName,
        billNumber: filterBillNumber,
        bookNumber: filterBookNumber,
        fromDate: filterFromDate,
        toDate: filterToDate,
        billIssuerId: filterBillIssuerId,
      }),
  })

  const setFilterByDebouncing = useDebounce(
    (filterType: string, value: string) => {
      dispatch(setFilter({ filterType, value }))
    },
    500
  )

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Search Income Records
          </CardTitle>
          <CardAction>
            <Button
              variant="link"
              size="sm"
              onClick={() => dispatch(clearAllFilters())}
            >
              Clear all fields
            </Button>
          </CardAction>
          <CardDescription>Search and filter records.</CardDescription>
        </CardHeader>
        <CardContent className="mt-2">
          <form>
            <FieldGroup className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <Field>
                <RadioGroup
                  defaultValue="document"
                  onValueChange={(value: SearchType) => setSearchType(value)}
                  className="w-full flex-col items-start gap-4"
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="document" id="searchByDocument" />
                    <Label htmlFor="searchByDocument">Search By Document</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="name" id="searchByName" />
                    <Label htmlFor="searchByName">Search By Name</Label>
                  </div>
                </RadioGroup>
              </Field>
              <Field>
                <Label htmlFor="committeeId">
                  Select Committee <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={filterCommitteeId}
                  onValueChange={(value) =>
                    dispatch(setFilter({ filterType: "committeeId", value }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a committee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Committees</SelectLabel>
                      {committees?.map((committee) => (
                        <SelectItem
                          key={committee.id}
                          value={String(committee.id)}
                        >
                          {committee.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <Label htmlFor="state">
                  Name
                  {searchType === "name" && (
                    <span className="text-destructive">*</span>
                  )}
                </Label>
                <Input
                  id="name"
                  placeholder="Enter name"
                  onChange={(e) =>
                    useDebounce(
                      () =>
                        dispatch(
                          setFilter({
                            filterType: "name",
                            value: e.currentTarget.value,
                          })
                        ),
                      300
                    )
                  }
                  disabled={searchType !== "name"}
                />
              </Field>

              <Field>
                <Label htmlFor="bookNumber">
                  Book Number{" "}
                  {searchType === "document" && (
                    <span className="text-destructive">*</span>
                  )}
                </Label>
                <Input
                  id="bookNumber"
                  placeholder="Enter book number"
                  value={filterBookNumber}
                  onChange={(e) =>
                    setFilterByDebouncing("bookNumber", e.currentTarget.value)
                  }
                  disabled={searchType !== "document"}
                />
              </Field>
              <Field>
                <Label htmlFor="billNumber">
                  Bill Number
                  {searchType === "document" && (
                    <span className="text-destructive">*</span>
                  )}
                </Label>
                <Input
                  id="billNumber"
                  placeholder="Enter bill number"
                  value={filterBillNumber}
                  onChange={(e) =>
                    setFilterByDebouncing("billNumber", e.currentTarget.value)
                  }
                  disabled={searchType !== "document"}
                />
              </Field>
              <Field>
                <Label htmlFor="fromDate">From</Label>
                <NepaliDateInput
                  placeholder="Enter starting date"
                  onValueChange={(value) =>
                    setFilterByDebouncing("fromDate", value)
                  }
                />
              </Field>
              <Field>
                <Label htmlFor="toDate">To</Label>
                <NepaliDateInput
                  placeholder="Enter ending date"
                  onValueChange={(value) =>
                    setFilterByDebouncing("toDate", value)
                  }
                />
              </Field>
              <Field>
                <Label htmlFor="billIssuer">Bill Issuer</Label>
                <Select
                  value={filterBillIssuerId}
                  onValueChange={(value) =>
                    dispatch(
                      setFilter({
                        filterType: "billIssuerId",
                        value: String(value),
                      })
                    )
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a bill issuer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Bill Issuers</SelectLabel>
                      {billIssuers?.map((issuers) => (
                        <SelectItem key={issuers.id} value={String(issuers.id)}>
                          {issuers.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      {isSuccess && data && (
        <IncomeReportTable
          incomeData={data || []}
          isSuccess={isSuccess}
          isPending={isPending}
        />
      )}
      {isPending && (
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      )}
    </div>
  )
}

export default IncomeSearch
