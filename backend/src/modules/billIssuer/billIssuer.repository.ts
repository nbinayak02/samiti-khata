import { prisma } from "../../lib/prisma";
import { TCreateBillIssuer } from "./billIssuer.types";

const BillIssuerRepository = {
  create: async (data: TCreateBillIssuer, organizationId: number) => {
    return await prisma.billIssuer.create({
      data: {
        ...data,
        organizationId,
      },
    });
  },

  getBillIssuersByOrganization: async (organizationId: number) => {
    return await prisma.billIssuer.findMany({
      where: {
        organizationId,
      },
    });
  },
};

export default BillIssuerRepository;