import { PageHeader } from "@/components/common/pageHeader"
import { useAppDispatch, useAppSelector } from "@/hooks/typeSafeReduxHooks"
import { useEffect } from "react"
import { fetchUserAssignedOrganization } from "../organization/organization.slice"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CalendarDays } from "lucide-react"
import NepaliDate from "nepali-date-converter"
import AddIncome from "../income/ui/add-income"
import IncomeTable from "../income/ui/income-table"
import ExpenseTable from "../expense/ui/expense-table"
import AddExpense from "../expense/ui/add-expense-dialog"

export default function Dashboard() {
  // fetch org details
  const dispatch = useAppDispatch()
  const isUserAssignedOrgFetchIdle = useAppSelector(
    (state) => state.organization.status.fetchUserAssigned === "idle"
  )
  const role = useAppSelector((state) => state.auth.role)
  const organizations = useAppSelector((state) => state.organization.data[0])
  const user = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (role !== "OWNER") dispatch(fetchUserAssignedOrganization())
  }, [isUserAssignedOrgFetchIdle, dispatch])

  return (
    <>
      <div className="flex w-full flex-row items-center justify-center">
        <PageHeader
          title={role === "OWNER" ? "Samiti Khata" : organizations?.name}
          description={organizations?.address}
          align="CENTER"
        />
      </div>

      <div className="mt-10 grid grid-cols-[800px_300px] grid-rows-2 gap-4">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Manage Income</CardTitle>
              <CardDescription>Manage your income bills here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <AddIncome />
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Recent Income</h3>
                <IncomeTable />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="row-span-2 flex flex-col gap-6">
          <Card>
            <CardContent className="flex flex-row items-center justify-start gap-6">
              <div>
                <CalendarDays size={28} className="text-muted-foreground" />
              </div>
              <div>
                <p>{new NepaliDate().toString()}</p>
                <p>{new Date().toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-lg font-semibold text-center">Samiti Khata</p>
              <p className="text-muted-foreground text-center">Your digital finance ledger tracker.</p>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Manage Expense
              </CardTitle>
              <CardDescription>Manage your expense bills here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <AddExpense />
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Recent Expenses</h3>
                <ExpenseTable />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
