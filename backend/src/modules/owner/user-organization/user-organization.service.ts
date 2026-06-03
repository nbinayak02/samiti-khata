import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { UserStatus } from '@prisma/client';

@Injectable()
export class UserOrganizationService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get details of organization that is assigned to user
   * @param userId Id of the user
   * @returns details of organization that is assigned to user
   */
  async getByUserId(userId: number) {
    return await this.prisma.userOrganization.findUnique({
      where: { userId },
    });
  }

  /**
   * Approves the admin or operator account by assigning organization
   * @param userId id of the user
   * @param organizationId  id of the organization
   * @returns newly created details
   */
  async approveUser(userId: number, organizationId: number) {
    return await this.prisma.userOrganization.create({
      data: {
        organizationId,
        userId,
        status: 'ACTIVE',
      },
    });
  }

  /**
   * Update Account Status of the organization admin or operator.
   * @param status Status that is to be set, of type UserStatus
   * @param userId Id of the user to update
   * @returns nothing
   */

  async updateAccountStatus(status: UserStatus, userId: number) {
    return await this.prisma.userOrganization.update({
      where: {
        userId,
      },
      data: {
        status,
      },
    });
  }
}
