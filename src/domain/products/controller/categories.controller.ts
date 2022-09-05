import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CategoryDto } from '../dto/category.dto';
import { CategoryService } from '../service/category.service';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly _categoryService: CategoryService) {}

  @ApiBearerAuth('JWT-auth')
  @Post()
  create(@Body() category: CategoryDto) {
    return this._categoryService.create(category);
  }
}
