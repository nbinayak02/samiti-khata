import IncomeRepository from "./income.repository";
import { TIncomeFormData } from "./income.types";

const IncomeService = {
  create: async (data: TIncomeFormData, createdBy: number) => {
    return await IncomeRepository.create(data, createdBy);
  },
  getRecentIncomeByOrganization: async (
    organizationId: number,
    pageSize: number,
    pageNumber: number,
  ) => {
    if (isNaN(pageSize)) pageSize = 10;
    if (isNaN(pageNumber)) pageNumber = 1;
    return await IncomeRepository.getRecentIncomesByOrganizationPaginated(
      organizationId,
      pageSize,
      pageNumber,
    );
  },
};

export default IncomeService;
