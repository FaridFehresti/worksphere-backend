import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async create(createTagDto: CreateTagDto) {
    return this.prisma.tag.create({ data: createTagDto });
  }

  async findAll() {
    return this.prisma.tag.findMany();
  }

  async remove(id: number) {
    return this.prisma.tag.delete({ where: { id } });
  }
}
