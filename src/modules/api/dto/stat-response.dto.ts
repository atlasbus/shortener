import { IStatResponse } from '../interfaces';

export class StatResponseDto implements IStatResponse {
  labels: string[];
  link: string;
  clicks: number[];
  totalClicks: string;
}
