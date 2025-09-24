import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
  IsEnum,
  IsDateString,
} from 'class-validator';
enum BlogStatus {
  DRAFT = 'DRAFT',
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
  SCHEDULED = 'SCHEDULED',
}

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsUUID()
  @IsNotEmpty()
  editorId: string;

  @IsUUID()
  @IsNotEmpty()
  blogAuthorId: string;

  @IsEnum(BlogStatus)
  @IsOptional()
  status?: BlogStatus;

  @IsString()
  @IsOptional()
  seoTitle?: string;

  @IsString()
  @IsOptional()
  seoDescription?: string;

  @IsString()
  @IsOptional()
  seoKeywords?: string;

  @IsDateString()
  @IsOptional()
  scheduledAt?: string;
}
