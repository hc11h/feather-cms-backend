import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  Req,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DevApiGuard } from './dev-api.guard';

@UseGuards(DevApiGuard)
@Controller('dev/blogs')
export class DevApiController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getBlogs(
    @Req() req,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    const userId = req.devUserId;
    const skip = (Number(page) - 1) * Number(limit);
    const [data, total] = await Promise.all([
      this.prisma.blog.findMany({
        where: { isDeleted: false, blogAuthor: { userId } },
        orderBy: { createdAt: 'desc' },
        skip,
        take: Number(limit),
      }),
      this.prisma.blog.count({
        where: { isDeleted: false, blogAuthor: { userId } },
      }),
    ]);
    return {
      data,
      meta: {
        page: Number(page),
        limit: Number(limit),
        total,
      },
    };
  }

  @Get(':id')
  async getBlog(@Req() req, @Param('id', ParseUUIDPipe) id: string) {
    const userId = req.devUserId;
    const blog = await this.prisma.blog.findFirst({
      where: { id, isDeleted: false, blogAuthor: { userId } },
    });
    if (!blog) return { error: 'Not found' };
    return blog;
  }
}
