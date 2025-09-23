import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateEditorDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content?: string;
}
