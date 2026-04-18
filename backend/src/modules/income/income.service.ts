import IncomeRepository from "./income.repository";
import { TIncomeFormData, TIncomeUpdate } from "./income.types";

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

  update: async (
    id: number,
    data: TIncomeUpdate,
    organizationId: number,
    userId: number,
  ) => {
    const { description, ...otherData } = data;

    const payload = {
      ...otherData,
      date: new Date(otherData.date).toISOString(),
    };

    const logInfo = { description, organizationId, userId };

    return await IncomeRepository.update(id, payload, logInfo);
  },

  delete: async (
    id: number,
    userId: number,
    organizationId: number,
    description: string,
  ) => {
    return await IncomeRepository.softDelete(id, {
      description,
      organizationId,
      userId,
    });
  },
};

export default IncomeService;
