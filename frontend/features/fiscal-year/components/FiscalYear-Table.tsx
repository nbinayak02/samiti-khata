"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetFiscalYear from "../hooks/useGetFiscalYear";

export default function FiscalYearTable() {
  const { data } = useGetFiscalYear();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Starting Date</TableHead>
          <TableHead>Ending Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data &&
          data.map((d, index) => (
            <TableRow key={d.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{d.name}</TableCell>
              <TableCell>{d.startDateBs}</TableCell>
              <TableCell>{d.endDateBs}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
