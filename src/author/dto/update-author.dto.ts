import { IsOptional, IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class UpdateBlogAuthorDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  profileImage?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
