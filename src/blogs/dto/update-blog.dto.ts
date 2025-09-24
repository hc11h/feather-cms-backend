import {
  IsOptional,
  IsString,
  IsEnum,
  IsDateString,
  IsUUID,
} from 'class-validator';

enum BlogStatus {
  DRAFT = 'DRAFT',
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
  SCHEDULED = 'SCHEDULED',
}

export class UpdateBlogDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsUUID()
  @IsOptional()
  editorId?: string;

  @IsUUID()
  @IsOptional()
  blogAuthorId?: string;

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
