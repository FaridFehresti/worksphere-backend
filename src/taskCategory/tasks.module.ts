import { Module } from '@nestjs/common';
import { TaskCategoryService } from './task-category.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskCategoryController } from './task-category.controller';

@Module({
  controllers: [TaskCategoryController],
  providers: [TaskCategoryService, PrismaService],
})
export class TaskCategoryModule {}
