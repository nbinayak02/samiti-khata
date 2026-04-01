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
import committeeRepository from "@/features/committee/service/committee.service"
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
import {
  clearAllFilters,
  setCurrentPage,
  setFilter,
} from "../expense.report.slice"
import { useDebounce } from "@/hooks/useDebounce"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, FileDown, Loader2 } from "lucide-react"
import NepaliDateInputFilter from "@/components/common/nepali-date-input-filter"
import PaginationComponent from "@/components/common/pagination"
import CategoryRepository from "@/features/category/category.repository"
import ExpenseReportTable from "./expense-report-table"
import useExpenseReport from "../useExpenseReport"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useState } from "react"

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

  const currentPage = useAppSelector((state) => state.expenseReport.currentPage)
  const totalPages = useAppSelector((state) => state.expenseReport.totalPages)
  const isReportDownloading = useAppSelector(
    (state) => state.expenseReport.isDownloading
  )

  const { searchResult, isSuccess, isPending, handleDownload } =
    useExpenseReport()

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
                Search Expense Records
              </CardTitle>
              <CardAction>
                <CollapsibleTrigger>
                  <div className="flex flex-row items-center gap-3">
                    {collapsed ? (
                      <>
                        Show Filters <ChevronDown size={20} />
                      </>
                    ) : (
                      <>
                        Hide Filters <ChevronUp size={20} />
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
                            <SelectItem
                              key={category.id}
                              value={String(category.id)}
                            >
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
                      value={filterCommitteeId}
                      onValueChange={(value) =>
                        dispatch(
                          setFilter({ filterType: "paymentMode", value })
                        )
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
                      value={filterCommitteeId}
                      onValueChange={(value) =>
                        dispatch(
                          setFilter({ filterType: "documentType", value })
                        )
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
                </FieldGroup>
              </CardContent>
            </CollapsibleContent>
          </form>
        </Card>
      </Collapsible>
      {isSuccess && searchResult && (
        <div className="mt-6 space-y-3">
          <Button
            onClick={handleDownload}
            variant={"secondary"}
            disabled={searchResult.data.length === 0 || isReportDownloading}
          >
            {isReportDownloading ? (
              <>
                Downloading
                <Loader2 className="animate-spin" />
              </>
            ) : (
              <>
                <FileDown size={20} />
                Download in Excel
              </>
            )}
          </Button>
          <ExpenseReportTable expenseData={searchResult.data || []} />
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages || 1}
            onPageChange={(page) => dispatch(setCurrentPage(page))}
          />
        </div>
      )}
      {isPending && (
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      )}
    </div>
  )
}

export default ExpenseSearch
