import { useState } from "react"
import { PageHeader } from "@/components/common/pageHeader"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import IncomeSearch from "@/page/reports/ui/income-search-filter"
import ExpenseSearch from "@/page/reports/ui/expense-search-filter"
import DownloadReportPageRangeDialog from "./ui/download-page-range-dialog"
import useDownoadExpenseReport from "./useDownloadExpenseReport"
import useExpenseReport from "./useExpenseReport"
import { useAppSelector } from "@/hooks/typeSafeReduxHooks"
import ExpenseReportTable from "./ui/expense-report-table"
import { Loader2 } from "lucide-react"
import useDownloadIncomeReport from "./useDownloadIncomeReport"
import useIncomeReport from "./useIncomeReport"
import IncomeReportTable from "./ui/income-report-table"

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

  const currentExpensePage = useAppSelector(
    (state) => state.expenseReport.currentPage
  )
  const totalExpensePages = useAppSelector(
    (state) => state.expenseReport.totalPages
  )
  const currentIncomePage = useAppSelector(
    (state) => state.expenseReport.currentPage
  )
  const totalIncomePages = useAppSelector(
    (state) => state.incomeReport.totalPages
  )
  const isExpenseReportDownloading = useAppSelector(
    (state) => state.expenseReport.isDownloading
  )
  const isIncomeReportDownloading = useAppSelector(
    (state) => state.incomeReport.isDownloading
  )
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
                currentPage={currentIncomePage}
                totalPages={totalIncomePages || 1}
              />
            )}
          </div>
          {isIncomeSearchPending && (
            <div className="flex items-center justify-center">
              <Loader2 className="animate-spin" />
            </div>
          )}
        </TabsContent>



        {/* expense tab content  */}

        <TabsContent value="expense" className="mt-5">
          <ExpenseSearch />

          <div className="mt-6 space-y-3">
            <DownloadReportPageRangeDialog
              onButtonClick={(range) => downloadExpenseReport({ range })}
              isDownloading={isExpenseReportDownloading}
              isDisabled={
                !expenseSearchResult || expenseSearchResult.data.length === 0
              }
            />

            {isExpenseSearchSuccess && expenseSearchResult && (
              <ExpenseReportTable
                expenseData={expenseSearchResult.data || []}
                currentPage={currentExpensePage}
                totalPages={totalExpensePages || 1}
              />
            )}
          </div>
          {isExpenseSearchPending && (
            <div className="flex items-center justify-center">
              <Loader2 className="animate-spin" />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </>
  )
}

export default ReportsPage
