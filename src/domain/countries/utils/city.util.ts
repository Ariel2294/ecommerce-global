import { FilterQuery, QueryOptions } from 'mongoose';
import { CityFilterDto } from '../dto/city.dto';
import { Cities } from '../schemas/cities.schema';

export const getCityParams = (filter: CityFilterDto): FilterQuery<Cities> => {
  if (!filter.cityId) {
    const regex = new RegExp(filter.search, 'i');
    return {
      $and: [{ code: filter.countryIsoCode }],
      $or: [
        {
          name: regex,
        },
        {
          code: regex,
        },
      ],
    };
  }

  return {
    _id: filter.cityId,
  };
};

export const cityFindQueryOptions = (filter: CityFilterDto): QueryOptions => {
  const { limit = 10, page = 1 } = filter;
  const skip = (page - 1) * limit;
  return {
    limit,
    skip,
  };
};

export const cityFindDataResponse = (
  filter: CityFilterDto,
  countries,
  count: number,
) => {
  if (!filter.cityId) {
    const limit = filter.limit || 10;
    const pages = Math.ceil(count / limit);
    return {
      metaData: {
        total: count,
        pages,
      },
      data: countries,
    };
  }

  return countries[0];
};
