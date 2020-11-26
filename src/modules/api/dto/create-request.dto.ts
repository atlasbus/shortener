import {
  IsFQDN,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ICreateRequest } from '../interfaces';

export class CreateRequestDto implements ICreateRequest {
  @IsFQDN()
  @IsNotEmpty()
  domain: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @IsOptional()
  slug?: string;
}
