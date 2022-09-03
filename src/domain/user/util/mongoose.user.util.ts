import { QueryOptions } from 'mongoose';
import { UserFilterDto } from '../dto/user.dto';

export const userFindQueryOptions = (filter: UserFilterDto): QueryOptions => {
  const { limit = 10, page = 1 } = filter;
  const skip = (page - 1) * limit;
  return {
    populate: { path: 'country' },
    limit,
    skip,
  };
};
