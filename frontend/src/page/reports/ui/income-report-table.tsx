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
import type { TIncome } from "@/page/income/income.types"
import { setCurrentPage } from "../income.report.slice"
import { useAppDispatch } from "@/hooks/typeSafeReduxHooks"
import UpdateIncome from "@/page/income/ui/update-income"
import DeleteDialog from "@/components/common/delete-dialog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import IncomeRepository from "@/page/income/income.repository"
import { useEffect, useState } from "react"
import useDeleteIncome from "../useDeleteIncome"
import IncomeDataViewer from "@/components/common/income-data-view"

const IncomeReportTable = ({
  incomeData,
  totalPages,
  currentPage,
}: {
  incomeData: TIncome[]
  currentPage: number
  totalPages: number
}) => {
  const dispatch = useAppDispatch()
  const { deleteIncome } = useDeleteIncome()

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
                <TableHead className="text-center">Action</TableHead>
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
                    <TableCell className="space-x-2">
                      <IncomeDataViewer id={income.id} />
                      <UpdateIncome id={income.id} />
                      <DeleteDialog onDelete={() => deleteIncome(income.id)} />
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
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages || 1}
        onPageChange={(page) => dispatch(setCurrentPage(page))}
      />
    </Card>
  )
}

export default IncomeReportTable
