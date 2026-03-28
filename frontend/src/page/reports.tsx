import { useState } from "react"
import { PageHeader } from "@/components/common/pageHeader"
import ExpenseReportCard from "@/features/reports/ui/expense-report-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import IncomeSearch from "@/features/reports/ui/income-search-filter"
import ExpenseSearch from "@/features/reports/ui/expense-search-filter"

type ReportTab = "income" | "expense"

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState<ReportTab>("income")
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
        </TabsContent>
      </Tabs>
    </>
  )
}

export default ReportsPage
