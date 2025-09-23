import { Module } from '@nestjs/common';
import { BlogAuthorController } from './author.controller';
import { BlogAuthorService } from './author.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BlogAuthorController],
  providers: [BlogAuthorService],
})
export class BlogAuthorModule {}
