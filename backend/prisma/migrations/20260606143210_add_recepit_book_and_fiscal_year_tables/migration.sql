-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('AVAILABLE', 'ASSIGNED', 'RETURNED');

-- AlterTable
ALTER TABLE "Income" ADD COLUMN     "receiptBookId" INTEGER;

-- CreateTable
CREATE TABLE "ReceiptBooks" (
    "id" SERIAL NOT NULL,
    "bookNumber" INTEGER NOT NULL,
    "receiptStartingNumber" INTEGER NOT NULL,
    "receiptEndingNumber" INTEGER NOT NULL,
    "fiscalYearId" INTEGER NOT NULL,
    "status" "BookStatus" NOT NULL DEFAULT 'AVAILABLE',
    "assignedTo" INTEGER,
    "assignedAt" TIMESTAMP(3),
    "returnedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReceiptBooks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FiscalYear" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startDateBs" TEXT NOT NULL,
    "startDateIso" TIMESTAMP(3) NOT NULL,
    "endDateBs" TEXT NOT NULL,
    "endDateIso" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FiscalYear_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReceiptBooks_bookNumber_fiscalYearId_key" ON "ReceiptBooks"("bookNumber", "fiscalYearId");

-- CreateIndex
CREATE UNIQUE INDEX "FiscalYear_startDateBs_endDateBs_key" ON "FiscalYear"("startDateBs", "endDateBs");

-- CreateIndex
CREATE UNIQUE INDEX "FiscalYear_startDateIso_endDateIso_key" ON "FiscalYear"("startDateIso", "endDateIso");

-- AddForeignKey
ALTER TABLE "ReceiptBooks" ADD CONSTRAINT "ReceiptBooks_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES "AuthorizedOrgMember"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceiptBooks" ADD CONSTRAINT "ReceiptBooks_fiscalYearId_fkey" FOREIGN KEY ("fiscalYearId") REFERENCES "FiscalYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_receiptBookId_fkey" FOREIGN KEY ("receiptBookId") REFERENCES "ReceiptBooks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
