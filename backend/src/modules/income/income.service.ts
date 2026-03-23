import IncomeRepository from "./income.repository";
import { TIncomeFormData } from "./income.types";

const IncomeService = {
  create: async (data: TIncomeFormData, createdBy: number) => {
    const payload = { ...data, date: new Date(data.date).toISOString() };
    return await IncomeRepository.create(payload, createdBy);
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
