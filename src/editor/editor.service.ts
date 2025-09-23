import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEditorDto } from './dto/create-editor.dto';
import { UpdateEditorDto } from './dto/update-editor.dto';

@Injectable()
export class EditorService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.editor.findMany({
      where: { userId, isDeleted: false },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, id: string) {
    const editor = await this.prisma.editor.findFirst({
      where: { id, userId, isDeleted: false },
    });
    if (!editor) throw new NotFoundException('Editor not found');
    return editor;
  }

  async create(userId: string, dto: CreateEditorDto) {
    return this.prisma.editor.create({
      data: { ...dto, userId },
    });
  }

  async update(userId: string, id: string, dto: UpdateEditorDto) {
    const editor = await this.prisma.editor.findFirst({
      where: { id, userId, isDeleted: false },
    });
    if (!editor) throw new NotFoundException('Editor not found');
    return this.prisma.editor.update({
      where: { id },
      data: { ...dto },
    });
  }

  async softDelete(userId: string, id: string) {
    const editor = await this.prisma.editor.findFirst({
      where: { id, userId, isDeleted: false },
    });
    if (!editor) throw new NotFoundException('Editor not found');
    return this.prisma.editor.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }
}
