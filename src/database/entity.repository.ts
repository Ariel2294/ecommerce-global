import {
  Document,
  FilterQuery,
  Model,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    select?: string,
    optionalFilter?: QueryOptions<T>,
  ): Promise<T | null> {
    return this.entityModel
      .findOne(entityFilterQuery, select, optionalFilter)
      .exec();
  }

  async find(
    entityFilterQuery: FilterQuery<T>,
    optionalFilter?: QueryOptions<T>,
  ): Promise<T[] | null> {
    return this.entityModel.find(entityFilterQuery, undefined, optionalFilter);
  }

  async create(createEntityData: unknown): Promise<T> {
    const entity = new this.entityModel(createEntityData);
    return entity.save();
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<T | null> {
    return this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      updateEntityData,
      {
        new: true,
      },
    );
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
    return deleteResult.deletedCount >= 1;
  }

  async count(entityFilterQuery?: FilterQuery<T>): Promise<number> {
    return this.entityModel.count(entityFilterQuery);
  }
}
