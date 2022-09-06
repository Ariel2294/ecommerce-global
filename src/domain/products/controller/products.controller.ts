import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { GeolocationData } from '../../geolocation/interfaces/geolocation.interface';
import {
  ProductCreateDto,
  ProductDto,
  ProductFilterDto,
  UploadImagesParamsDto,
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

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        images: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'productId', type: String, required: true })
  @Patch(':productId')
  @UseInterceptors(FilesInterceptor('images'))
  uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param() params: UploadImagesParamsDto,
  ) {
    return this._productsService.uploadImagesProducts(params.productId, files);
  }
}
