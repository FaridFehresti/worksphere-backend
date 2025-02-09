import { IsString, IsOptional, IsArray, IsInt, IsNotEmpty, IsDate } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  hardness?: number;

  @IsInt()
  @IsOptional()
  priority?: number;

  @IsDate()
  @IsOptional()
  deadline?: Date;

  @IsInt()
  @IsOptional()
  categoryId?: number;

  @IsArray()
  @IsOptional()
  tags?: number[];
}