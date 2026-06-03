import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/prisma';
import { OrganizationDto } from './libs/organization.dto';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}

  /***
   * Creates an organization
   * @param organizationDto: Payload required for organization creation
   * @param ownerId: Id of OWNER user role. Only OWNER can create organization
   * @returns newly created organization details from database
   */
  async create(organizationDto: OrganizationDto, ownerId: number) {
    const orgExists = await this.getByEmail(organizationDto.email);
    if (orgExists)
      throw new ConflictException(
        'The email is already assigned to another organization.',
      );
    return await this.prisma.organization.create({
      data: {
        address: organizationDto.address,
        email: organizationDto.email,
        name: organizationDto.name,
        phoneNumber: organizationDto.phoneNumber,
        createdBy: ownerId,
      },
    });
  }

  /**
   * Get all organizations created by ownerId
   * @param ownerId Id of OWNER role.
   * @returns Array of organizations
   */

  async getAll(ownerId: number) {
    return await this.prisma.organization.findMany({
      where: {
        createdBy: ownerId,
      },
    });
  }

  /**
   * Get an organization by it's Id
   * @param orgId: Organization Id
   * @returns Organization that matches the Id
   */

  async getById(orgId: number) {
    return await this.prisma.organization.findFirst({
      where: {
        id: orgId,
      },
    });
  }

  /**
   * Get an organization by it's email
   * @param email Email of the organization
   * @returns Organization
   */

  async getByEmail(email: string) {
    return await this.prisma.organization.findFirst({
      where: {
        email,
      },
    });
  }
}
