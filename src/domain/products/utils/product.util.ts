import { FilterQuery, QueryOptions } from 'mongoose';
import { GeolocationData } from '../../geolocation/interfaces/geolocation.interface';
import { ProductFilterDto } from '../dto/product.dto';
import { Products } from '../schemas/products.schema';

export const getProductParams = (
  filter: ProductFilterDto,
): FilterQuery<Products> => {
  if (!filter.productId) {
    const regex = new RegExp(filter.search, 'i');

    if (!filter.categoryId) {
      return {
        $or: [
          {
            name: regex,
          },
          {
            description: regex,
          },
        ],
      };
    }

    return {
      $and: [
        {
          categoryId: filter.categoryId,
        },
      ],
      $or: [
        {
          name: regex,
        },
        {
          description: regex,
        },
      ],
    };
  }

  return {
    _id: filter.productId,
  };
};

export const productFindQueryOptions = (
  filter: ProductFilterDto,
): QueryOptions => {
  const { limit = 10, page = 1 } = filter;
  const skip = (page - 1) * limit;
  return {
    populate: { path: 'categoryId' },
    limit,
    skip,
  };
};

export const productFindDataResponse = (
  filter: ProductFilterDto,
  products,
  count: number,
  geoLocation: GeolocationData,
) => {
  const currencyCode = geoLocation.geolocationData.currency.code;
  const currencyRate = geoLocation.currencyData.rates[currencyCode]['rate'];
  if (!filter.productId) {
    const limit = filter.limit || 10;
    const pages = Math.ceil(count / limit);
    return {
      metaData: {
        total: count,
        pages,
      },
      data: getDataReponseProduct(products, currencyCode, currencyRate),
    };
  }

  const product = getDataReponseProduct(products, currencyCode, currencyRate);
  return product[0];
};

export const calculatePrice = (price: number, rate: number) => {
  const priceCurrency = price * rate;
  return priceCurrency;
};

export const getPricesProduct = (prices, rate) => {
  return prices.map((priceElement) => ({
    _id: priceElement._id,
    price: calculatePrice(priceElement.price, rate),
  }));
};

export const getDataReponseProduct = (products, currencyCode, currencyRate) => {
  return products.map((produc) => ({
    _id: produc._id,
    name: produc.name,
    description: produc.description,
    currency: currencyCode,
    price: calculatePrice(produc.price, currencyRate),
    categoryId: produc.categoryId
      ? {
          _id: produc.categoryId._id,
          name: produc.categoryId.name,
        }
      : null,

    prices: getPricesProduct(produc.prices, currencyRate),
    descriptions: produc.descriptions,
    images: produc.images,
  }));
};
