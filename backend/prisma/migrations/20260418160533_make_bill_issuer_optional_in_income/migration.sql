-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_billIssuerId_fkey";

-- AlterTable
ALTER TABLE "Income" ALTER COLUMN "billIssuerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_billIssuerId_fkey" FOREIGN KEY ("billIssuerId") REFERENCES "BillIssuer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
