import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  preferred_currency?: string;

  @ApiProperty()
  @IsMongoId()
  country: string;
}

export class UserFilterDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  userId?: string;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
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
