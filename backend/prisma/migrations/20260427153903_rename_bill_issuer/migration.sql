-- Rename Table
ALTER TABLE "BillIssuer" RENAME TO "AuthorizedOrgMember";

-- Rename primary key constraint
ALTER TABLE "AuthorizedOrgMember" RENAME CONSTRAINT "BillIssuer_pkey" TO "AuthorizedOrgMember_pkey";

-- Rename foreign key constraint on AuthorizedOrgMember table
ALTER TABLE "AuthorizedOrgMember" RENAME CONSTRAINT "BillIssuer_organizationId_fkey" TO "AuthorizedOrgMember_organizationId_fkey";

-- Rename the foreign key constraint on Income table (drop and recreate since it references the renamed table)
ALTER TABLE "Income" DROP CONSTRAINT "Income_billIssuerId_fkey";
ALTER TABLE "Income" ADD CONSTRAINT "Income_billIssuerId_fkey" FOREIGN KEY ("billIssuerId") REFERENCES "AuthorizedOrgMember"("id") ON DELETE SET NULL ON UPDATE CASCADE;
