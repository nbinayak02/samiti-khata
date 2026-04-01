import { useEffect } from "react"
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
  setDownloading,
  setFilter,
  setPageSize,
  setTotalPages,
} from "../expense.report.slice"
import { useDebounce } from "@/hooks/useDebounce"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import NepaliDateInputFilter from "@/components/common/nepali-date-input-filter"
import PaginationComponent from "@/components/common/pagination"
import CategoryRepository from "@/features/category/category.repository"
import ExpenseRepository from "@/features/expense/expense.repository"
import ExpenseReportTable from "./expense-report-table"
import { toast } from "sonner"

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
  const filterDocumentType = useAppSelector(
    (state) => state.expenseReport.documentType
  )
  const filterPaymentMode = useAppSelector(
    (state) => state.expenseReport.paymentMode
  )

  const filterName = useAppSelector((state) => state.expenseReport.name)
  const filterAddress = useAppSelector((state) => state.expenseReport.address)
  const filterFromDate = useAppSelector((state) => state.expenseReport.fromDate)
  const filterToDate = useAppSelector((state) => state.expenseReport.toDate)
  const currentPage = useAppSelector((state) => state.expenseReport.currentPage)
  const pageSize = useAppSelector((state) => state.expenseReport.pageSize)
  const totalPages = useAppSelector((state) => state.expenseReport.totalPages)
  const isReportDownloading = useAppSelector(
    (state) => state.expenseReport.isDownloading
  )

  const {
    data: expenseResponse,
    isSuccess,
    isPending,
  } = useQuery({
    queryKey: [
      "expenses",
      {
        filterCommitteeId,
        filterName,
        filterAddress,
        filterCategoryId,
        filterFromDate,
        filterToDate,
        filterDocumentType,
        filterPaymentMode,
        currentPage,
        pageSize,
      },
    ],
    queryFn: () =>
      ExpenseRepository.search({
        committeeId: filterCommitteeId,
        name: filterName,
        address: filterAddress,
        categoryId: filterCategoryId,
        documentType: filterDocumentType,
        paymentMode: filterPaymentMode,
        fromDate: filterFromDate,
        toDate: filterToDate,
        currentPage: String(currentPage),
        pageSize: String(pageSize),
      }),
  })

  const setFilterByDebouncing = useDebounce(
    (filterType: string, value: string) => {
      dispatch(setFilter({ filterType, value }))
    },
    500
  )

  const handleDownload = async () => {
    try {
      dispatch(setDownloading(true))
      const data = await ExpenseRepository.export({
        committeeId: filterCommitteeId,
        name: filterName,
        address: filterAddress,
        categoryId: filterCategoryId,
        documentType: filterDocumentType,
        paymentMode: filterPaymentMode,
        fromDate: filterFromDate,
        toDate: filterToDate,
        currentPage: String(currentPage),
        pageSize: String(pageSize),
      })

      const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "expense_report.xlsx")
      document.body.appendChild(link)
      link.click()
    } catch (error) {
      toast.error("Something went wrong while downloading")
    } finally {
      dispatch(setDownloading(false))
    }
  }

  // update total pages, current page and page size in the store when incomeResponse changes
  useEffect(() => {
    dispatch(setTotalPages(expenseResponse?.totalPages))
    dispatch(setCurrentPage(expenseResponse?.pageNumber))
    dispatch(setPageSize(expenseResponse?.pageSize))
  }, [expenseResponse])

  return (
    <div className="space-y-8">
      <Card>
        <form>
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Search Expense Records
            </CardTitle>
            <CardAction>
              <Button
                type="reset"
                variant="link"
                size="sm"
                onClick={() => dispatch(clearAllFilters())}
              >
                Reset Form
              </Button>
            </CardAction>
            <CardDescription>Search and filter records.</CardDescription>
          </CardHeader>
          <CardContent className="mt-6">
            <FieldGroup className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                  value={filterCommitteeId}
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
        </form>
      </Card>
      {isSuccess && expenseResponse && (
        <>
          <Button
            onClick={handleDownload}
            disabled={expenseResponse.data.length === 0 || isReportDownloading}
          >
            {isReportDownloading ? (
              <>
                Downloading
                <Loader2 className="animate-spin" />
              </>
            ) : (
              <>Download in Excel</>
            )}
          </Button>
          <ExpenseReportTable expenseData={expenseResponse.data || []} />
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages || 1}
            onPageChange={(page) => dispatch(setCurrentPage(page))}
          />
        </>
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
