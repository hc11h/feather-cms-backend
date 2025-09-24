import { IsDateString } from 'class-validator';

export class ScheduleBlogDto {
  @IsDateString()
  scheduledAt: string;
}
