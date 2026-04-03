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

type ReportTab = "income" | "expense"

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState<ReportTab>("income")
  const { downloadExpenseReport } = useDownoadExpenseReport()
  const { searchResult, isSuccess, isPending } = useExpenseReport()
  const currentPage = useAppSelector((state) => state.expenseReport.currentPage)
  const totalPages = useAppSelector((state) => state.expenseReport.totalPages)
  const isReportDownloading = useAppSelector(
    (state) => state.expenseReport.isDownloading
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

        <TabsContent value="income" className="mt-5">
          <IncomeSearch />
        </TabsContent>
        <TabsContent value="expense" className="mt-5">
          <ExpenseSearch />

          <div className="mt-6 space-y-3">
            <DownloadReportPageRangeDialog
              onButtonClick={(range) => downloadExpenseReport({ range })}
              isDownloading={isReportDownloading}
              isDisabled={!searchResult || searchResult.data.length === 0}
            />

            {isSuccess && searchResult && (
              <ExpenseReportTable
                expenseData={searchResult.data || []}
                currentPage={currentPage}
                totalPages={totalPages || 1}
              />
            )}
          </div>
          {isPending && (
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
