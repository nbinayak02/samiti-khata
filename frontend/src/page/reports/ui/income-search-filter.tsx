import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useQuery } from "@tanstack/react-query"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup } from "@/components/ui/field"
import committeeRepository from "@/page/committee/committee.service"
import billIssuerRepository from "@/page/bill-issuer/billIssuer.repository"
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
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react"
import NepaliDateInputFilter from "@/components/common/nepali-date-input-filter"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useState } from "react"

const IncomeSearch = () => {
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

  const filterBillIssuerId = useAppSelector(
    (state) => state.incomeReport.billIssuerId
  )

  const setFilterByDebouncing = useDebounce(
    (filterType: string, value: string) => {
      dispatch(setFilter({ filterType, value }))
    },
    500
  )

  const [collapsed, setCollapsed] = useState(true)

  return (
    <div className="space-y-8">
      <Collapsible open={collapsed} onOpenChange={(open) => setCollapsed(open)}>
        <Card>
          <form>
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Search Income Records
              </CardTitle>
              <CardAction>
                <CollapsibleTrigger>
                  <div className="flex flex-row items-center gap-3">
                    {collapsed ? (
                      <>
                        Hide Filters <ChevronUp size={20} />
                      </>
                    ) : (
                      <>
                        Show Filters <ChevronDown size={20} />
                      </>
                    )}
                  </div>
                </CollapsibleTrigger>
              </CardAction>
              <CardDescription>Search and filter records.</CardDescription>
            </CardHeader>
            <CollapsibleContent>
              <CardContent>
                <div className="flex flex-row justify-end">
                  <Button
                    type="reset"
                    variant="link"
                    onClick={() => dispatch(clearAllFilters())}
                  >
                    Reset Form
                  </Button>
                </div>
                <FieldGroup className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <Field>
                    <Label htmlFor="committeeId">Select Committee</Label>
                    <Select
                      value={filterCommitteeId}
                      onValueChange={(value) =>
                        dispatch(
                          setFilter({ filterType: "committeeId", value })
                        )
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a committee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Committees</SelectLabel>
                          {committees?.data.map((committee) => (
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
                    <Label htmlFor="state">Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter name"
                      onChange={(e) =>
                        setFilterByDebouncing("name", e.currentTarget.value)
                      }
                    />
                  </Field>

                  <Field>
                    <Label htmlFor="bookNumber">Book Number</Label>
                    <Input
                      id="bookNumber"
                      placeholder="Enter book number"
                      onChange={(e) =>
                        setFilterByDebouncing(
                          "bookNumber",
                          e.currentTarget.value
                        )
                      }
                    />
                  </Field>
                  <Field>
                    <Label htmlFor="billNumber">Bill Number</Label>
                    <Input
                      id="billNumber"
                      placeholder="Enter bill number"
                      onChange={(e) =>
                        setFilterByDebouncing(
                          "billNumber",
                          e.currentTarget.value
                        )
                      }
                    />
                  </Field>
                  <Field>
                    <Label htmlFor="fromDate">From</Label>
                    <NepaliDateInputFilter
                      placeholder="Enter starting date"
                      onValueChange={(value) =>
                        setFilterByDebouncing("fromDate", value)
                      }
                    />
                  </Field>
                  <Field>
                    <Label htmlFor="toDate">To</Label>
                    <NepaliDateInputFilter
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
                            <SelectItem
                              key={issuers.id}
                              value={String(issuers.id)}
                            >
                              {issuers.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                </FieldGroup>
              </CardContent>
            </CollapsibleContent>
          </form>
        </Card>
      </Collapsible>
    </div>
  )
}

export default IncomeSearch
