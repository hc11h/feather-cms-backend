import { Controller, Post, Get, Delete, Req, UseGuards } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@Controller('/api-key')
export class ApiKeyController {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  @Post()
  async generate(@Req() req) {
    const userId = req.user?.id;
    const key = await this.apiKeyService.generate(userId);
    return { apiKey: key };
  }

  @Get()
  async getStatus(@Req() req) {
    const userId = req.user?.id;
    return this.apiKeyService.getStatus(userId);
  }

  @Delete()
  async deactivate(@Req() req) {
    const userId = req.user?.id;
    return this.apiKeyService.deactivate(userId);
  }
}
