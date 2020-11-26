import { EGranularity } from '../enum';

export interface IGetStatParam {
  domain: string;
  slug: string;
  granularity: EGranularity;
}
