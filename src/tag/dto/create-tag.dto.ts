import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  color: string;
}