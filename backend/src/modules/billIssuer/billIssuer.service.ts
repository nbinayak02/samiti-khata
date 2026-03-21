import BillIssuerRepository from "./billIssuer.repository";
import { TCreateBillIssuer } from "./billIssuer.types";

const BillIssuerService = {
  create: async (data: TCreateBillIssuer, organizationId: number) => {
    return await BillIssuerRepository.create(data, organizationId);
  },

  getBillIssuersByOrganization: async (organizationId: number) => {
    return await BillIssuerRepository.getBillIssuersByOrganization(
      organizationId,
    );
  },
};

export default BillIssuerService;
