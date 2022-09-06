export const currencyDataMock = {
  base_currency_code: 'USD',
  base_currency_name: 'United States dollar',
  amount: '1.0000',
  updated_date: '2022-09-04',
  rates: {
    MXN: {
      currency_name: 'Mexican peso',
      rate: '19.9549',
      rate_for_amount: '19.9549',
    },
  },
  status: 'success',
};
export const geolocationDataMock = {
  geolocationData: {
    ip: '169.57.37.1',
    type: 'IPv4',
    location: {
      latitude: 19.4326,
      longitude: -99.1332,
    },
    postcode: '03020',
    area: {
      code: 'MX-CMX',
      geonameid: 3527646,
      name: 'Mexico City',
    },
    asn: {
      number: 36351,
      organisation: 'SOFTLAYER',
    },
    city: {
      geonameid: 3530597,
      name: 'Mexico City',
      population: 12294193,
    },
    continent: {
      geonameid: 6255149,
      name: 'North America',
      code: 'NA',
    },
    country: {
      geonameid: 3996063,
      name: 'Mexico',
      code: 'MX',
      capital: 'Mexico City',
      area_size: '1972550.00 sq. km',
      population: 126190788,
      phone_code: '52',
      is_in_eu: false,
      languages: {
        es: 'Spanish language',
      },
      flag: {
        file: 'https://commons.wikimedia.org/wiki/Special:FilePath/Flag_of_Mexico.svg',
        emoji: '🇲🇽',
        unicode: 'U+1F1F2 U+1F1FD',
      },
      tld: '.mx',
    },
    currency: {
      code: 'MXN',
      name: 'Mexican peso',
    },
    security: {
      is_tor: false,
      is_proxy: false,
      is_crawler: false,
      is_threat: true,
      is_thread: true,
    },
    time: {
      timezone: 'America/Mexico_City',
      gtm_offset: -18000,
      gmt_offset: -18000,
      is_daylight_saving: true,
      code: 'CDT',
    },
    status: 'success',
  },
  currencyData: currencyDataMock,
};
