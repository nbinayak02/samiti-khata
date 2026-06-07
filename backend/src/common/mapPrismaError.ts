import { HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';

interface MappedPrismaError {
  status: number;
  message: string;
  errorCode: string;
}

export function mapPrismaError(
  exception: Prisma.PrismaClientKnownRequestError,
): MappedPrismaError {
  switch (exception.code) {
    case 'P2025': // findFirstOrThrow, findUniqueOrThrow, or missing records on write
      return {
        status: HttpStatus.NOT_FOUND,
        message:
          (exception.meta?.cause as string) ||
          'The requested record could not be found.',
        errorCode: 'ERR_RECORD_NOT_FOUND',
      };

    case 'P2002': {
      // Unique constraint violations
      const targetFields =
        (exception.meta?.target as string[]).join(', ') || 'field';
      return {
        status: HttpStatus.CONFLICT,
        message: `A record with this ${targetFields} already exists.`,
        errorCode: 'ERR_DUPLICATE_RECORD',
      };
    }

    case 'P2003': // Foreign key constraint violations
      return {
        status: HttpStatus.BAD_REQUEST,
        message:
          'Database relation constraint violation. Relational entity missing.',
        errorCode: 'ERR_FOREIGN_KEY_VIOLATION',
      };

    default: // Catch-all for other structural Prisma codes
      return {
        status: HttpStatus.BAD_REQUEST,
        message: `Database operation failed: ${exception.message}`,
        errorCode: `ERR_PRISMA_${exception.code}`,
      };
  }
}
