import { FilterQuery, QueryOptions } from 'mongoose';
import { CountryFilterDto } from '../dto/country.dto';
import { Countries } from '../schemas/countries.schema';

export const getCountryParams = (
  filter: CountryFilterDto,
): FilterQuery<Countries> => {
  if (!filter.countryIdentifier) {
    const regex = new RegExp(filter.search, 'i');
    return {
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
    $or: [
      {
        _id: filter.countryIdentifier,
      },
      {
        code: filter.countryIdentifier,
      },
    ],
  };
};

export const countryFindQueryOptions = (
  filter: CountryFilterDto,
): QueryOptions => {
  const { limit = 10, page = 1 } = filter;
  const skip = (page - 1) * limit;
  return {
    limit,
    skip,
  };
};

export const countryFindDataResponse = (
  filter: CountryFilterDto,
  countries,
  count: number,
) => {
  if (!filter.countryIdentifier) {
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
