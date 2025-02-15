import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TaskCategoryService } from './task-category.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskCategoryDto } from './dto/create-taskCategory.dto';
import { UpdateTaskCategoryDto } from './dto/update-taskCategory.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('task-categories')
export class TaskCategoryController {
  constructor(private readonly taskCategoryService: TaskCategoryService) {}

  @Post()
  create(@Body() createTaskCategoryDto: CreateTaskCategoryDto) {
    return this.taskCategoryService.create(createTaskCategoryDto);
  }

  @Get()
  findAll() {
    return this.taskCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskCategoryDto: UpdateTaskCategoryDto) {
    return this.taskCategoryService.update(+id, updateTaskCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskCategoryService.remove(+id);
  }
}
