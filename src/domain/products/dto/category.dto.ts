import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryDto {
  @ApiProperty({ example: 'Teléfono' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
