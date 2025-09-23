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
import { BlogAuthorService } from './author.service';
import { CreateBlogAuthorDto } from './dto/create-author.dto';
import { UpdateBlogAuthorDto } from './dto/update-author.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@Controller('/authors')
export class BlogAuthorController {
  constructor(private readonly blogAuthorService: BlogAuthorService) {}

  @Get()
  async findAll(@Req() req) {
    const userId = req.user?.id;
    return this.blogAuthorService.findAll(userId);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Req() req, @Body() dto: CreateBlogAuthorDto) {
    const userId = req.user?.id;
    return this.blogAuthorService.create(userId, dto);
  }

  @Get(':id')
  async findOne(@Req() req, @Param('id', ParseUUIDPipe) id: string) {
    const userId = req.user?.id;
    return this.blogAuthorService.findOne(userId, id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(
    @Req() req,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateBlogAuthorDto,
  ) {
    const userId = req.user?.id;
    return this.blogAuthorService.update(userId, id, dto);
  }

  @Delete(':id')
  async remove(@Req() req, @Param('id', ParseUUIDPipe) id: string) {
    const userId = req.user?.id;
    return this.blogAuthorService.softDelete(userId, id);
  }
}
