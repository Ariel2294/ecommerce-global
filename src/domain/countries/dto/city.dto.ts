import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { FilterQueryDto } from '../../../shared/dto/filter.dto';

export class CityFilterDto extends FilterQueryDto {
  @ApiProperty({
    description: 'ISO code country',
    example: 'SV',
  })
  @IsOptional()
  @IsString()
  countryIsoCode?: string;

  @ApiProperty({ description: '_id record' })
  @IsOptional()
  @IsString()
  cityId?: string;
}
