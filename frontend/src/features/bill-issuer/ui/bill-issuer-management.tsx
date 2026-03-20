import BillIssuersTable from "./bill-issuers-table"
import CreateBillIssuerDialog from "./create-bill-issuer-dialog"

const BillIssuerManagement = () => {
  return (
    <div className="space-y-4">
      <CreateBillIssuerDialog />
      <BillIssuersTable />
    </div>
  )
}

export default BillIssuerManagement
