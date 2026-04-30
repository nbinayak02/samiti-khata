import { prisma } from "../../lib/prisma";
import { TCreateAuthorizedOrgMember } from "./authorizedOrgMember.types";

// Renamed from BillIssuerRepository

const AuthorizedOrgMemberRepository = {
  create: async (data: TCreateAuthorizedOrgMember, organizationId: number) => {
    return await prisma.authorizedOrgMember.create({
      data: {
        ...data,
        organizationId,
      },
    });
  },

  getByOrganization: async (organizationId: number) => {
    return await prisma.authorizedOrgMember.findMany({
      where: {
        organizationId,
      },
    });
  },
};

export default AuthorizedOrgMemberRepository;
