import { components } from "./schema";

export type SignupDto = components["schemas"]["SignupDto"];
export type LoginDto = components["schemas"]["LoginDto"];
export type ApproveUserDto = components["schemas"]["ApproveUserDto"];
export type UpdateStatusDto = components["schemas"]["UpdateStatusDto"];
export type OrganizationDto = components["schemas"]["OrganizationDto"];
export type CommitteeDto = components["schemas"]["CommitteeDto"];
export type SubCommitteeDto = components["schemas"]["SubCommitteeDto"];
export type AuthorizedOrgMemberDto =
  components["schemas"]["AuthorizedOrgMemberDto"];
export type CategoryDto = components["schemas"]["CategoryDto"];
export type ExpenseDto = components["schemas"]["ExpenseDto"];
export type UpdateExpenseDto = components["schemas"]["UpdateExpenseDto"];
export type IncomeDto = components["schemas"]["IncomeDto"];
export type UpdateIncomeDto = components["schemas"]["UpdateIncomeDto"];
export type ReceiptBookDto = components["schemas"]["ReceiptBookDto"];
export type AssignBookDto = components["schemas"]["AssignBookDto"];
export type ReturnBookDto = components["schemas"]["ReturnBookDto"];
// export type CreateAdminDto = components['schemas']["Crea"]

export type TableMetadata = {
  id: number;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
};

export type PaginationMetadata = {
  pageIndex: number;
  pageSize: number;
  totalPages: number;
};
