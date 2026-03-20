import { prisma } from "../../lib/prisma";
import { TIncomeFormData } from "./income.types";

const IncomeRepository = {
  create: async (data: TIncomeFormData, createdBy: number) => {
    return await prisma.income.create({
      data: {
        ...data,
        createdBy,
        remarks: data.remarks || null,
      },
    });
  },

  getRecentIncomesByOrganizationPaginated: async (
    organizationId: number,
    pageSize: number,
    pageNumber: number,
  ) => {
    return await prisma.income.findMany({
      where: {
        committee: {
          organizationId,
        },
      },
      include: {
        billIssuer: true,
        committee: true,
      },
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      orderBy: {
        id: "desc",
      },
    });
  },
};

export default IncomeRepository;
