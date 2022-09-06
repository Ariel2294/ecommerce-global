import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { MongoErrorHandler } from '../../../database/handlers/mongo-error-handler';
import { createContextWinston } from '../../../utils/logger';
import { Logger } from 'winston';
import { CategoryDto } from '../dto/category.dto';
import { CategoryRepository } from '../repository/category.repository';

@Injectable()
export class CategoryService {
  constructor(
    private readonly _categoryRepository: CategoryRepository,
    private readonly _mongoErrorHandler: MongoErrorHandler,

    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async create(category: CategoryDto) {
    const context = createContextWinston(
      this.constructor.name,
      this.create.name,
    );

    try {
      this.logger.debug('Attempting  to create a category', {
        ...context,
      });

      const categoryCreated = await this._categoryRepository.create({
        name: category.name,
      });

      return { categoryId: categoryCreated._id };
    } catch (error) {
      this._mongoErrorHandler.handleMongooseErrors(error, this.create.name);
    }
  }
}
