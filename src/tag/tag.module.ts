import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { PrismaService } from 'src/prisma/prisma.service';


@Module({
  providers: [TagService, PrismaService],
     controllers: [TagController],
})
export class TagModule {}
