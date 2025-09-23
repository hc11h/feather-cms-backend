import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateBlogAuthorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  profileImage?: string; 

  @IsString()
  @IsOptional()
  description?: string;
}
