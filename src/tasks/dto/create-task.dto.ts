import { IsString, IsOptional, IsArray, IsInt, IsNotEmpty, IsBoolean } from 'class-validator';

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

  @IsString()
  @IsOptional()
  deadline?: string; // Changed to string

  @IsInt()
  @IsOptional()
  categoryId?: number;

  @IsInt()
  @IsOptional()
  parentId?: number; // Parent task ID

  @IsBoolean()
  @IsOptional()
  isComplete?: boolean;

  @IsArray()
  @IsOptional()
  tags?: number[];
}
