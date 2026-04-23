import { useState } from "react"
import { PageHeader } from "@/components/common/pageHeader"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import IncomeSearch from "@/page/reports/ui/income-search-filter"
import ExpenseSearch from "@/page/reports/ui/expense-search-filter"
import DownloadReportPageRangeDialog from "./ui/download-page-range-dialog"
import useDownoadExpenseReport from "./useDownloadExpenseReport"
import useExpenseReport from "./useExpenseReport"
import { useAppDispatch, useAppSelector } from "@/hooks/typeSafeReduxHooks"
import ExpenseReportTable from "./ui/expense-report-table"
import { Loader2 } from "lucide-react"
import useDownloadIncomeReport from "./useDownloadIncomeReport"
import useIncomeReport from "./useIncomeReport"
import IncomeReportTable from "./ui/income-report-table"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  clearAllIncomeFilters,
  setCurrentIncomePage,
  setIncomePageSize,
} from "./income.report.slice"
import {
  clearAllExpenseFilters,
  setCurrentExpensePage,
  setExpensePageSize,
} from "./expense.report.slice"
import { PaginationComponent } from "@/components/common/paginationComponent"

type ReportTab = "income" | "expense"

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState<ReportTab>("income")
  const { downloadExpenseReport } = useDownoadExpenseReport()
  const { downloadIncomeReport } = useDownloadIncomeReport()

  const {
    data: expenseSearchResult,
    isExpenseSearchSuccess,
    isExpenseSearchPending,
  } = useExpenseReport()

  const {
    data: incomeSearchResult,
    isIncomeSearchSuccess,
    isIncomeSearchPending,
  } = useIncomeReport()

  const currentIncomePage = useAppSelector(
    (state) => state.incomeReport.currentPage
  )
  const totalIncomePages = useAppSelector(
    (state) => state.incomeReport.totalPages
  )
  const incomePageSize = useAppSelector((state) => state.incomeReport.pageSize)

  const currentExpensePage = useAppSelector(
    (state) => state.expenseReport.currentPage
  )
  const totalExpensePages = useAppSelector(
    (state) => state.expenseReport.totalPages
  )
  const expensePageSize = useAppSelector(
    (state) => state.expenseReport.pageSize
  )

  const isExpenseReportDownloading = useAppSelector(
    (state) => state.expenseReport.isDownloading
  )
  const isIncomeReportDownloading = useAppSelector(
    (state) => state.incomeReport.isDownloading
  )

  const dispatch = useAppDispatch()
  return (
    <>
      <PageHeader title="Reports" description="View and export reports." />

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as ReportTab)}
        className="mt-5"
      >
        <TabsList>
          <TabsTrigger className="w-60" value="income">
            Income
          </TabsTrigger>
          <TabsTrigger value="expense">Expense</TabsTrigger>
        </TabsList>

        {/* income tab content */}

        <TabsContent value="income" className="mt-5">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Search Income</CardTitle>
            </CardHeader>
            <CardContent>
              <IncomeSearch />
              
              <div className="mt-6 space-y-3">
                <DownloadReportPageRangeDialog
                  onButtonClick={(range) => downloadIncomeReport({ range })}
                  isDownloading={isIncomeReportDownloading}
                  isDisabled={
                    !incomeSearchResult || incomeSearchResult.data.length === 0
                  }
                />

                {isIncomeSearchSuccess && incomeSearchResult && (
                  <IncomeReportTable
                    incomeData={incomeSearchResult.data || []}
                  />
                )}
                {isIncomeSearchPending && (
                  <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin" />
                  </div>
                )}
                <PaginationComponent
                  currentPage={currentIncomePage}
                  totalPages={totalIncomePages}
                  pageSize={incomePageSize}
                  onPageChange={(value) =>
                    dispatch(setCurrentIncomePage(value))
                  }
                  onRowsAmountChange={(value) =>
                    dispatch(setIncomePageSize(value))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* expense tab content  */}

        <TabsContent value="expense" className="mt-5">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Search Expense
              </CardTitle>
             
            </CardHeader>
            <CardContent>
              <ExpenseSearch />
             
              <div className="mt-6 space-y-3">
                <DownloadReportPageRangeDialog
                  onButtonClick={(range) => downloadExpenseReport({ range })}
                  isDownloading={isExpenseReportDownloading}
                  isDisabled={
                    !expenseSearchResult ||
                    expenseSearchResult.data.length === 0
                  }
                />

                {isExpenseSearchSuccess && expenseSearchResult && (
                  <ExpenseReportTable
                    expenseData={expenseSearchResult.data || []}
                  />
                )}

                {isExpenseSearchPending && (
                  <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin" />
                  </div>
                )}

                <PaginationComponent
                  currentPage={currentExpensePage}
                  totalPages={totalExpensePages}
                  pageSize={expensePageSize}
                  onPageChange={(value) =>
                    dispatch(setCurrentExpensePage(value))
                  }
                  onRowsAmountChange={(value) =>
                    dispatch(setExpensePageSize(value))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}

export default ReportsPage
