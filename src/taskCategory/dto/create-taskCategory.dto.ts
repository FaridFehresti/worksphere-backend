import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTaskCategoryDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
