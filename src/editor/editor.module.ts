import { Module } from '@nestjs/common';
import { EditorController } from './editor.controller';
import { EditorService } from './editor.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EditorController],
  providers: [EditorService],
})
export class EditorModule {}
