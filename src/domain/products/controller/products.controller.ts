import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GeolocationData } from '../../geolocation/interfaces/geolocation.interface';
import {
  ProductCreateDto,
  ProductDto,
  ProductFilterDto,
} from '../dto/product.dto';
import { ProductsService } from '../service/products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly _productsService: ProductsService) {}

  @ApiBearerAuth('JWT-auth')
  @Post()
  create(@Body() product: ProductCreateDto) {
    return this._productsService.create(product);
  }
  @ApiBearerAuth('JWT-auth')
  @Put(':productId')
  update(@Body() product: ProductDto, @Param('productId') productId: string) {
    return this._productsService.update(product, productId);
  }

  @ApiQuery({
    name: 'productId',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'categoryId',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'search',
    type: String,
    required: false,
  })
  @Get()
  getAll(@Query() filter: ProductFilterDto, @Headers() headers) {
    const geolocationData: GeolocationData = JSON.parse(
      headers['geo-location'],
    );
    return this._productsService.getAll(filter, geolocationData);
  }
}
