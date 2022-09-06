import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { FilterQueryDto } from '../../../shared/dto/filter.dto';

export class CountryFilterDto extends FilterQueryDto {
  @ApiProperty({ description: 'ISO code country or _id record' })
  @IsOptional()
  @IsString()
  countryIdentifier?: string;
}
