import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { RouterModule } from '@nestjs/core';
import { routes } from './app.routes';
import { TasksModule } from './tasks/tasks.module';
import { TagModule } from './tag/tag.module';
import { TaskCategoryModule } from './taskCategory/tasks.module';

@Module({
  imports: [
    RouterModule.register(routes),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    UserModule,
    AuthModule,
    TasksModule,
    TagModule,
    TaskCategoryModule
  ],
  providers: [PrismaService],
})
export class AppModule {}
