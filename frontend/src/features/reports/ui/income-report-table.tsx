import PaginationComponent from "@/components/common/pagination"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { TIncome } from "@/features/income/income.types"

const IncomeReportTable = ({ incomeData }: { incomeData: TIncome[] }) => {
  return (
    <Card>
      <CardContent>
        <div className="rounded-md border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Bill No.</TableHead>
                <TableHead>Book No.</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Committee</TableHead>
                <TableHead>Bill Issuer</TableHead>
                <TableHead>Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incomeData && incomeData.length > 0 ? (
                incomeData.map((income: TIncome, index: number) => (
                  <TableRow key={income.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{income.billNumber}</TableCell>
                    <TableCell>{income.bookNumber}</TableCell>
                    <TableCell>{income.nepaliDate}</TableCell>
                    <TableCell className="max-w-30 truncate">
                      {income.name}
                    </TableCell>
                    <TableCell className="max-w-30 truncate">
                      {income.address}
                    </TableCell>
                    <TableCell>{income.amount}</TableCell>
                    <TableCell className="max-w-30 truncate">
                      {income.committee.name}
                    </TableCell>
                    <TableCell className="max-w-30 truncate">
                      {income.billIssuer.name}
                    </TableCell>
                    <TableCell className="max-w-30 truncate">
                      {income.remarks || "-"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="py-8 text-center text-muted-foreground"
                  >
                    No income found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export default IncomeReportTable
