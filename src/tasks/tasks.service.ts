import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, userId: number) {
    return this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        hardness: createTaskDto.hardness,
        priority: createTaskDto.priority,
        deadline: createTaskDto.deadline,
        taskCategoryId: createTaskDto.categoryId,
        createdBy: userId,
        userId,
        tags: {
          connect: createTaskDto.tags?.map(tagId => ({ id: tagId })) || [],
        },
      },
      include: { tags: true },
    });
  }

  async findAll(userId: number) {
    return this.prisma.task.findMany({
      where: { userId },
      include: { tags: true, taskCategory: true },
    });
  }

  async findOne(id: number, userId: number) {
    return this.prisma.task.findFirst({
      where: { id, userId },
      include: { tags: true, taskCategory: true },
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
    return this.prisma.task.update({
      where: { id, userId },
      data: {
        title: updateTaskDto.title,
        description: updateTaskDto.description,
        hardness: updateTaskDto.hardness,
        priority: updateTaskDto.priority,
        deadline: updateTaskDto.deadline,
        taskCategoryId: updateTaskDto.categoryId,
        tags: {
          set: updateTaskDto.tags?.map(tagId => ({ id: tagId })) || [],
        },
      },
      include: { tags: true },
    });
  }

  async remove(id: number, userId: number) {
    return this.prisma.task.delete({
      where: { id, userId },
    });
  }
}
