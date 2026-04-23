import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useQuery } from "@tanstack/react-query"
import { Field, FieldGroup } from "@/components/ui/field"
import committeeRepository from "@/page/committee/committee.service"
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
import { setFilter } from "../expense.report.slice"
import { useDebounce } from "@/hooks/useDebounce"
import NepaliDateInputFilter from "@/components/common/nepali-date-input-filter"
import CategoryRepository from "@/page/category/category.repository"

const ExpenseSearch = () => {
  const dispatch = useAppDispatch()

  const { data: committees } = useQuery({
    queryKey: ["committees"],
    queryFn: committeeRepository.fetchAllByOrganization,
  })

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: CategoryRepository.fetchAllByOrganization,
  })

  const filterCommitteeId = useAppSelector(
    (state) => state.expenseReport.committeeId
  )
  const filterCategoryId = useAppSelector(
    (state) => state.expenseReport.categoryId
  )

  const filterPaymentMode = useAppSelector(
    (state) => state.expenseReport.paymentMode
  )

  const filterDocumentType = useAppSelector(
    (state) => state.expenseReport.documentType
  )

  const setFilterByDebouncing = useDebounce(
    (filterType: string, value: string) => {
      dispatch(setFilter({ filterType, value }))
    },
    500
  )

  return (
    <form className="px-2 py-4">
      <FieldGroup className="flex flex-row">
        <Field>
          <Label htmlFor="committeeId">Select Committee</Label>
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
          <Label htmlFor="categoryId">Select Category</Label>
          <Select
            value={filterCategoryId}
            onValueChange={(value) =>
              dispatch(setFilter({ filterType: "categoryId", value }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={String(category.id)}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Enter name"
            onChange={(e) =>
              setFilterByDebouncing("name", e.currentTarget.value)
            }
          />
        </Field>
        <Field>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            placeholder="Enter address"
            onChange={(e) =>
              setFilterByDebouncing("address", e.currentTarget.value)
            }
          />
        </Field>

        <Field>
          <Label htmlFor="paymentMode">Payment Mode</Label>
          <Select
            value={filterPaymentMode}
            onValueChange={(value) =>
              dispatch(setFilter({ filterType: "paymentMode", value }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a payment mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Payment Mode</SelectLabel>
                <SelectItem value={"CASH"}>Cash</SelectItem>
                <SelectItem value={"CHEQUE"}>Cheque</SelectItem>
                <SelectItem value={"ONLINE"}>Online</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <Label htmlFor="documentType">Document Type</Label>
          <Select
            value={filterDocumentType}
            onValueChange={(value) =>
              dispatch(setFilter({ filterType: "documentType", value }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a document type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Document Type</SelectLabel>
                <SelectItem value={"BILL"}>Bill</SelectItem>
                <SelectItem value={"VOUCHER"}>Voucher</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <Label htmlFor="fromDate">From</Label>
          <NepaliDateInputFilter
            placeholder="Enter starting date"
            onValueChange={(value) => setFilterByDebouncing("fromDate", value)}
          />
        </Field>
        <Field>
          <Label htmlFor="toDate">To</Label>
          <NepaliDateInputFilter
            placeholder="Enter ending date"
            onValueChange={(value) => setFilterByDebouncing("toDate", value)}
          />
        </Field>
      </FieldGroup>
    </form>
  )
}

export default ExpenseSearch
