import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV008",
    paymentStatus: "Paid",
    totalAmount: "$350.00",
    paymentMethod: "Debit Card",
  },
  {
    invoice: "INV009",
    paymentStatus: "Pending",
    totalAmount: "$969.00",
    paymentMethod: "Google Pay",
  },
  {
    invoice: "INV010",
    paymentStatus: "Unpaid",
    totalAmount: "$815.00",
    paymentMethod: "Apple Pay",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV008",
    paymentStatus: "Paid",
    totalAmount: "$350.00",
    paymentMethod: "Debit Card",
  },
  {
    invoice: "INV009",
    paymentStatus: "Pending",
    totalAmount: "$969.00",
    paymentMethod: "Google Pay",
  },
  {
    invoice: "INV010",
    paymentStatus: "Unpaid",
    totalAmount: "$815.00",
    paymentMethod: "Apple Pay",
  },
];

const StickyHeaderTableDemo = () => {
  return (
    <div className="w-full h-full min-h-0 flex flex-col dark:bg-muted/40 bg-muted rounded-4xl border mb-2">
      <div className="pl-5 py-5 text-lg font-bold shrink-0">Recent Income</div>

      <div className="flex-1 min-h-0 overflow-auto [&>div]:overflow-visible">
        <Table>
          <TableHeader>
            <TableRow className="sticky top-0 border-t backdrop-blur-2xl bg-white dark:bg-muted/40">
              <TableHead className="w-25">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white dark:bg-muted/30">
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="text-right">
                  {invoice.totalAmount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <div className="w-full h-10 shrink-0"></div>
    </div>
  );
};

export default StickyHeaderTableDemo;
