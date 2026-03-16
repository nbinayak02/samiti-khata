/*
  Warnings:

  - You are about to drop the column `role` on the `UserOrganization` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'OPERATOR';

-- AlterTable
ALTER TABLE "UserOrganization" DROP COLUMN "role";
