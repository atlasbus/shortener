import { IsEnum, IsFQDN } from 'class-validator';
import { EGranularity } from '../enum';
import { IGetStatParam } from '../interfaces';

export class GetStatParamDto implements IGetStatParam {
  @IsFQDN()
  domain: string;

  slug: string;

  @IsEnum(EGranularity)
  granularity: EGranularity;
}
