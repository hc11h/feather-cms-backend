import { Module } from '@nestjs/common';
import { DevApiController } from './dev-api.controller';
import { DevApiGuard } from './dev-api.guard';
import { PrismaModule } from '../prisma/prisma.module';
import { ApiKeyModule } from '../api-key/api-key.module';

@Module({
  imports: [PrismaModule, ApiKeyModule],
  controllers: [DevApiController],
  providers: [DevApiGuard],
})
export class DevApiModule {}
