import { ApiProperty } from '@nestjs/swagger';

import {
  IsBoolean,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { FilterQueryDto } from '../../../shared/dto/filter.dto';

export class UserDto {
  @ApiProperty({ example: 'Osmín' })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'López' })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({ example: 'mail@domain.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'mySecurePassword' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'USD', default: null })
  @IsOptional()
  @IsString()
  preferred_currency?: string;

  @ApiProperty({ example: '631203e9d75a73ce254fda1a' })
  @IsMongoId()
  country: string;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  newsLetterSubscription?: boolean;
}

export class UserFilterDto extends FilterQueryDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  userId?: string;
}
