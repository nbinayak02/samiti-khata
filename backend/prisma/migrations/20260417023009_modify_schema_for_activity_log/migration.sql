/*
  Warnings:

  - You are about to drop the column `changedFields` on the `ActivityLog` table. All the data in the column will be lost.
  - Changed the type of `entityType` on the `ActivityLog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `action` on the `ActivityLog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('INCOME', 'EXPENSE', 'ASSET', 'USER');

-- CreateEnum
CREATE TYPE "EntityAction" AS ENUM ('UPDATE', 'DELETE', 'APPROVE', 'SUSPEND', 'ACTIVATE', 'DEACTIVATE');

-- AlterTable
ALTER TABLE "ActivityLog" DROP COLUMN "changedFields",
DROP COLUMN "entityType",
ADD COLUMN     "entityType" "EntityType" NOT NULL,
DROP COLUMN "action",
ADD COLUMN     "action" "EntityAction" NOT NULL;

-- AlterTable
ALTER TABLE "BillIssuer" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deletedAt" TIMESTAMP(3);
