/*
  Warnings:

  - Added the required column `organizationId` to the `FiscalYear` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `ReceiptBooks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FiscalYear" ADD COLUMN     "organizationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ReceiptBooks" ADD COLUMN     "organizationId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ReceiptBooks" ADD CONSTRAINT "ReceiptBooks_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FiscalYear" ADD CONSTRAINT "FiscalYear_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
