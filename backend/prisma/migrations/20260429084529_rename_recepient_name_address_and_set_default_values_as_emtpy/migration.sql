/*
  Warnings:

  - You are about to drop the column `address` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Expense` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "address",
DROP COLUMN "name",
ADD COLUMN     "recepientAddress" TEXT NOT NULL DEFAULT 'empty',
ADD COLUMN     "recepientName" TEXT NOT NULL DEFAULT 'empty';
