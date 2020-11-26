import { IsNumber } from 'class-validator';
import { IStatResponse } from '../interfaces';

export class StatResponseDto implements IStatResponse {
  labels: string[];
  link: string;
  clicks: number[];

  @IsNumber()
  totalClicks: number;
}
