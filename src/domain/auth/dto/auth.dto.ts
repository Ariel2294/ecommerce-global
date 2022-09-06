import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({ example: 'mail@domain.com' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ example: 'mySecurePassword' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
