import { Module } from '@nestjs/common';
import { ProductsService } from './service/products.service';
import { CategoryService } from './service/category.service';
import { ProductsController } from './controller/products.controller';
import { CategoriesController } from './controller/categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Categories, CategoriesSchema } from './schemas/categories.schema';
import { Products, ProductsSchema } from './schemas/products.schema';
import { CategoryRepository } from './repository/category.repository';
import { MongoErrorHandler } from '../../database/handlers/mongo-error-handler';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Categories.name, schema: CategoriesSchema },
      { name: Products.name, schema: ProductsSchema },
    ]),
  ],
  providers: [
    ProductsService,
    CategoryService,
    CategoryRepository,
    MongoErrorHandler,
  ],
  controllers: [ProductsController, CategoriesController],
})
export class ProductsModule {}
