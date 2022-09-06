import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { FilterQueryDto } from '../../../shared/dto/filter.dto';

export class DescriptionProductDto {
  @ApiProperty({ example: 'Memoria RAM' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: '64 GB' })
  @IsNotEmpty()
  @IsString()
  value: string;
}

export class PricesProductDto {
  @ApiProperty({ example: 25.14 })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}

export class ProductDto {
  @ApiProperty({ example: 'Pc Gamer RGB' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Para los juegos más pro del mercado' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 15.51,
    description: 'Prices in currency default system',
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ example: '631203e9d75a73ce254fda1a' })
  @IsMongoId()
  categoryId: string;
}

export class ProductCreateDto extends ProductDto {
  @ApiProperty({ type: DescriptionProductDto, isArray: true })
  @ValidateNested({ each: true })
  @IsOptional()
  descriptionsProduct: DescriptionProductDto[] = [];

  @ApiProperty({ type: PricesProductDto, isArray: true })
  @ValidateNested({ each: true })
  @IsOptional()
  pricesProduct: PricesProductDto[] = [];
}

export class ProductFilterDto extends FilterQueryDto {
  @ApiProperty({ example: '631203e9d75a73ce254fda1a' })
  @IsOptional()
  @IsString()
  productId?: string;

  @ApiProperty({ example: '631203e9d75a73ce254fda1a' })
  @IsOptional()
  @IsString()
  categoryId?: string;
}

export class UploadImagesParamsDto {
  @IsNotEmpty()
  @IsString()
  productId: string;
}
