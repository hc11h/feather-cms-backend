import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';

@Injectable()
export class ApiKeyService {
  constructor(private prisma: PrismaService) {}

  async generate(userId: string) {
    const existing = await this.prisma.apiKey.findUnique({ where: { userId } });
    if (existing && existing.isActive) {
      throw new ForbiddenException(
        'API key already exists. Revoke it before generating a new one.',
      );
    }

    const plainKey = randomBytes(32).toString('hex');
    const hashedKey = await bcrypt.hash(plainKey, 10);

    await this.prisma.apiKey.upsert({
      where: { userId },
      update: { key: hashedKey, isActive: true },
      create: { userId, key: hashedKey },
    });
    return plainKey;
  }

  async getStatus(userId: string) {
    const apiKey = await this.prisma.apiKey.findUnique({ where: { userId } });
    if (!apiKey) return { active: false };
    return { active: apiKey.isActive };
  }

  async deactivate(userId: string) {
    const apiKey = await this.prisma.apiKey.findUnique({ where: { userId } });
    if (!apiKey || !apiKey.isActive)
      throw new NotFoundException('No active API key found');
    await this.prisma.apiKey.update({
      where: { userId },
      data: { isActive: false },
    });
    return { success: true };
  }

  async validateApiKey(providedKey: string) {
    const apiKey = await this.prisma.apiKey.findFirst({
      where: { isActive: true },
    });
    if (!apiKey) return null;
    const isValid = await bcrypt.compare(providedKey, apiKey.key);
    if (!isValid) return null;
    return apiKey.userId;
  }
}
