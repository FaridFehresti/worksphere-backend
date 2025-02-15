import { IsString, IsOptional } from 'class-validator';

export class UpdateTaskCategoryDto {
  @IsString()
  @IsOptional()
  title?: string;
}
