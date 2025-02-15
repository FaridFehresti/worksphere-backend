import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskCategoryDto } from './dto/create-taskCategory.dto';
import { UpdateTaskCategoryDto } from './dto/update-taskCategory.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TaskCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskCategoryDto: CreateTaskCategoryDto) {
    try {
      return await this.prisma.taskCategory.create({ data: createTaskCategoryDto });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('A category with this title already exists.');
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.taskCategory.findMany();
  }

  async findOne(id: number) {
    return this.prisma.taskCategory.findUnique({ where: { id } });
  }

  async update(id: number, updateTaskCategoryDto: UpdateTaskCategoryDto) {
    return this.prisma.taskCategory.update({
      where: { id },
      data: updateTaskCategoryDto,
    });
  }

  async remove(id: number) {
    return this.prisma.taskCategory.delete({ where: { id } });
  }
}
