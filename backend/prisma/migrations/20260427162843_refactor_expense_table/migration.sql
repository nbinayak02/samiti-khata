/*
  Warnings:

  - You are about to drop the column `documentNumber` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `documentType` on the `Expense` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "documentNumber",
DROP COLUMN "documentType",
ADD COLUMN     "billNumber" TEXT,
ADD COLUMN     "payerId" INTEGER,
ADD COLUMN     "quantity" TEXT,
ADD COLUMN     "voucherNumber" TEXT;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_payerId_fkey" FOREIGN KEY ("payerId") REFERENCES "AuthorizedOrgMember"("id") ON DELETE SET NULL ON UPDATE CASCADE;
