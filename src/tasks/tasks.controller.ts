import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Req() req, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto, req.user.id);
  }

  @Get()
  findAll(@Req() req) {
    return this.tasksService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Req() req, @Param('id') id: string) {
    return this.tasksService.findOne(+id, req.user.id);
  }

  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto, req.user.id);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.tasksService.remove(+id, req.user.id);
  }
}
