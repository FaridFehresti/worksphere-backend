import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, userId: number) {
    // Ensure a subtask is not assigned another subtask
    if (createTaskDto.parentId) {
      const parentTask = await this.prisma.task.findUnique({ where: { id: createTaskDto.parentId } });
      if (!parentTask) {
        throw new NotFoundException('Parent task not found');
      }
      if (parentTask.parentId) {
        throw new BadRequestException('A subtask cannot have its own subtask');
      }
    }

    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        createdBy: userId,
        userId,
        tags: createTaskDto.tags ? { connect: createTaskDto.tags.map(id => ({ id })) } : undefined,
      },
      include: { tags: true },
    });
  }

  async findAll(userId: number, categoryId?: number) {
    return this.prisma.task.findMany({
      where: { userId, taskCategoryId: categoryId || undefined },
      include: { tags: true, taskCategory: true, subtasks: true },
    });
  }

  async findOne(id: number, userId: number) {
    const task = await this.prisma.task.findFirst({ where: { id, userId }, include: { tags: true, taskCategory: true, subtasks: true } });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
    const task = await this.prisma.task.findFirst({ where: { id, userId } });
    if (!task) throw new NotFoundException('Task not found');
    return this.prisma.task.update({
      where: { id, userId },
      data: { ...updateTaskDto, tags: updateTaskDto.tags ? { set: updateTaskDto.tags.map(id => ({ id })) } : undefined },
      include: { tags: true },
    });
  }

  async remove(id: number, userId: number) {
    const task = await this.prisma.task.findFirst({ where: { id, userId } });
    if (!task) throw new NotFoundException('Task not found');
    return this.prisma.task.delete({ where: { id, userId } });
  }
}