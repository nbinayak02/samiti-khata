import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/prisma';
import { AuthorizedOrgMemberDto } from './lib/autorized-org-member.dto';

@Injectable()
export class AuthorizedOrgMemberService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    authorizedOrgMemberDto: AuthorizedOrgMemberDto,
    organizationId: number,
  ) {
    return await this.prisma.authorizedOrgMember.create({
      data: {
        name: authorizedOrgMemberDto.name,
        address: authorizedOrgMemberDto.address,
        phone: authorizedOrgMemberDto.phone,
        organizationId,
      },
    });
  }

  async getByOrganization(organizationId: number) {
    return await this.prisma.authorizedOrgMember.findMany({
      where: {
        organizationId,
      },
    });
  }
}
