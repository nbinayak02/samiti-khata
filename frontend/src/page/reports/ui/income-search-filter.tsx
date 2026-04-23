import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useQuery } from "@tanstack/react-query"
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
import { clearAllIncomeFilters, setFilter } from "../income.report.slice"
import { useDebounce } from "@/hooks/useDebounce"
import NepaliDateInputFilter from "@/components/common/nepali-date-input-filter"
import { Button } from "@/components/ui/button"

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

  return (
    <form className="px-2">
      <Button
        type="reset"
        variant="link"
        className="float-end"
        onClick={() => dispatch(clearAllIncomeFilters())}
      >
        Reset Form
      </Button>
      <FieldGroup className="flex flex-row flex-wrap lg:flex-nowrap">
        <Field>
          <Label htmlFor="committeeId">Select Committee</Label>
          <Select
            value={filterCommitteeId}
            onValueChange={(value) =>
              dispatch(setFilter({ filterType: "committeeId", value }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select committee" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Committees</SelectLabel>
                {committees?.data.map((committee) => (
                  <SelectItem key={committee.id} value={String(committee.id)}>
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
          <Label htmlFor="state">Address</Label>
          <Input
            id="address"
            placeholder="Enter address"
            onChange={(e) =>
              setFilterByDebouncing("address", e.currentTarget.value)
            }
          />
        </Field>

        <Field>
          <Label htmlFor="bookNumber">Book Number</Label>
          <Input
            id="bookNumber"
            placeholder="Enter book number"
            onChange={(e) =>
              setFilterByDebouncing("bookNumber", e.currentTarget.value)
            }
          />
        </Field>
        <Field>
          <Label htmlFor="billNumber">Bill Number</Label>
          <Input
            id="billNumber"
            placeholder="Enter bill number"
            onChange={(e) =>
              setFilterByDebouncing("billNumber", e.currentTarget.value)
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
              <SelectValue placeholder="Select bill issuer" />
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
        <Field>
          <Label htmlFor="fromDate">From</Label>
          <NepaliDateInputFilter
            placeholder="Starting date"
            onValueChange={(value) => setFilterByDebouncing("fromDate", value)}
          />
        </Field>
        <Field>
          <Label htmlFor="toDate">To</Label>
          <NepaliDateInputFilter
            placeholder="Ending date"
            onValueChange={(value) => setFilterByDebouncing("toDate", value)}
          />
        </Field>
      </FieldGroup>
    </form>
  )
}

export default IncomeSearch
