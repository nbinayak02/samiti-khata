import AuthorizedOrgMemberRepository from "./authorizedOrgMember.repository";
import { TCreateAuthorizedOrgMember } from "./authorizedOrgMember.types";

const AuthorizedOrgMemberService = {
  create: async (data: TCreateAuthorizedOrgMember, organizationId: number) => {
    return await AuthorizedOrgMemberRepository.create(data, organizationId);
  },

  getByOrganization: async (organizationId: number) => {
    return await AuthorizedOrgMemberRepository.getByOrganization(
      organizationId,
    );
  },
};

export default AuthorizedOrgMemberService;
