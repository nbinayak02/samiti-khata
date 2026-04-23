-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "subCommitteeId" INTEGER;

-- AlterTable
ALTER TABLE "Income" ADD COLUMN     "subCommitteeId" INTEGER;

-- CreateTable
CREATE TABLE "SubCommittee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "organizationId" INTEGER NOT NULL,
    "mainCommitteeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubCommittee_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_subCommitteeId_fkey" FOREIGN KEY ("subCommitteeId") REFERENCES "SubCommittee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_subCommitteeId_fkey" FOREIGN KEY ("subCommitteeId") REFERENCES "SubCommittee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubCommittee" ADD CONSTRAINT "SubCommittee_mainCommitteeId_fkey" FOREIGN KEY ("mainCommitteeId") REFERENCES "Committee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
