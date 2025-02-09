import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateTagDto } from './dto/create-tag.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Get()
  findAll() {
    return this.tagService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagService.remove(+id);
  }
}
