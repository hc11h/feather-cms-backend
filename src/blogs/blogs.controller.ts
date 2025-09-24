import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ScheduleBlogDto } from './dto/schedule-blog.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@Controller('/blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get()
  async findAll(@Req() req) {
    const userId = req.user?.id;
    return this.blogsService.findAll(userId);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Req() req, @Body() dto: CreateBlogDto) {
    const userId = req.user?.id;
    return this.blogsService.create(userId, dto);
  }

  @Get(':id')
  async findOne(@Req() req, @Param('id', ParseUUIDPipe) id: string) {
    const userId = req.user?.id;
    return this.blogsService.findOne(userId, id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(
    @Req() req,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateBlogDto,
  ) {
    const userId = req.user?.id;
    return this.blogsService.update(userId, id, dto);
  }

  @Delete(':id')
  async remove(@Req() req, @Param('id', ParseUUIDPipe) id: string) {
    const userId = req.user?.id;
    return this.blogsService.softDelete(userId, id);
  }

  @Post(':id/publish')
  async publish(@Req() req, @Param('id', ParseUUIDPipe) id: string) {
    const userId = req.user?.id;
    return this.blogsService.publish(userId, id);
  }

  @Post(':id/schedule')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async schedule(
    @Req() req,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ScheduleBlogDto,
  ) {
    const userId = req.user?.id;
    return this.blogsService.schedule(userId, id, dto);
  }
}
