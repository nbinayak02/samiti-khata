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
  getById: async (id: number, organizationId: number) => {
    return await IncomeRepository.getById(id, organizationId);
  },

  update: async (id: number, data: TIncomeFormData) => {
    const payload = { ...data, date: new Date(data.date).toISOString() };
    return await IncomeRepository.update(id, payload);
  },
};

export default IncomeService;
