import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FolioGeneratorService {
  constructor(private readonly prisma: PrismaService) {}

  // Generates next folio ID like L-1001, L-1002 ... based on current max numeric suffix.
  async next(): Promise<string> {
    // Use raw SQL to reliably get the maximum numeric part even if createdAt ordering differs.
    const rows = await this.prisma.$queryRaw<
      { id: string }[]
    >`SELECT id FROM license WHERE id ~ '^L-[0-9]+' ORDER BY (substring(id from 3)::int) DESC LIMIT 1;`;
    if (!rows || rows.length === 0) {
      return 'L-1001';
    }
    const current = parseInt(rows[0].id.replace('L-', ''), 10);
    return `L-${current + 1}`;
  }
}
