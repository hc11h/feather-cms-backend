import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogAuthorDto } from './dto/create-author.dto';
import { UpdateBlogAuthorDto } from './dto/update-author.dto';

@Injectable()
export class BlogAuthorService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.blogAuthor.findMany({
      where: { userId, isDeleted: false },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, id: string) {
    const author = await this.prisma.blogAuthor.findFirst({
      where: { id, userId, isDeleted: false },
    });
    if (!author) throw new NotFoundException('Author not found');
    return author;
  }

  async create(userId: string, dto: CreateBlogAuthorDto) {
    return this.prisma.blogAuthor.create({
      data: { ...dto, userId },
    });
  }

  async update(userId: string, id: string, dto: UpdateBlogAuthorDto) {
    const author = await this.prisma.blogAuthor.findFirst({
      where: { id, userId, isDeleted: false },
    });
    if (!author) throw new NotFoundException('Author not found');
    return this.prisma.blogAuthor.update({
      where: { id },
      data: { ...dto },
    });
  }

  async softDelete(userId: string, id: string) {
    const author = await this.prisma.blogAuthor.findFirst({
      where: { id, userId, isDeleted: false },
    });
    if (!author) throw new NotFoundException('Author not found');
    return this.prisma.blogAuthor.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }
}
