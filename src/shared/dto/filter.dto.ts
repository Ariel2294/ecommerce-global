import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class FilterQueryDto {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @Min(1)
  @Max(15)
  @ApiProperty()
  limit?: number;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  page?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  search?: string;
}
