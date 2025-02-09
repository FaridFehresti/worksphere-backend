import { IUserData } from './user-data.interfaces';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { validate } from 'class-validator';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async findUserById(id: number): Promise<{ email: string; id: number; first_name: string; last_name: string; user_name: string; } | null> {
    return this.prisma.user.findUnique({
        where: { id },
        select: { id: true, email: true, first_name: true, last_name: true, user_name: true }, // select only necessary fields
    });
}
  async findUserByEmail(email: string): Promise<{ email: string; password: string; id: number } | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(createUserDto: IUserData) {
    // Validate the input data
    const validationErrors = await validate(createUserDto);
    if (validationErrors.length > 0) {
      throw new BadRequestException(validationErrors);
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
        birthdate: new Date(createUserDto.birthdate),  // Convert string to Date object
        first_name: createUserDto.first_name,
        last_name: createUserDto.last_name,
        gender: createUserDto.gender,
        user_name: createUserDto.user_name,
      },
    });
  }

  async getUsers(): Promise<{ email: string; password: string; id: number }[]> {
    return this.prisma.user.findMany();
  }

}
