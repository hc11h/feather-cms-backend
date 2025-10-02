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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EditorService } from './editor.service';
import { CreateEditorDto } from './dto/create-editor.dto';
import { UpdateEditorDto } from './dto/update-editor.dto';

@UseGuards(JwtAuthGuard)
@Controller('/editor')
export class EditorController {
  constructor(private readonly editorService: EditorService) {}

  @Get()
  async findAll(@Req() req) {
    const userId = req.user?.id;
    return this.editorService.findAll(userId);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Req() req, @Body() dto: CreateEditorDto) {
    // console.log('details', req.user)
    const userId = req.user?.id;
    return this.editorService.create(userId, dto);
  }

  @Get(':id')
  async findOne(@Req() req, @Param('id', ParseUUIDPipe) id: string) {
    const userId = req.user?.id;
    return this.editorService.findOne(userId, id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(
    @Req() req,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateEditorDto,
  ) {
    const userId = req.user?.id;
    return this.editorService.update(userId, id, dto);
  }

  @Delete(':id')
  async remove(@Req() req, @Param('id', ParseUUIDPipe) id: string) {
    const userId = req.user?.id;
    return this.editorService.softDelete(userId, id);
  }
}
