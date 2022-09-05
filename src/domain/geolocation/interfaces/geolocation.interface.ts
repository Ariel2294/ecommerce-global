export interface Location {
  latitude: number;
  longitude: number;
}

export interface Area {
  code: string;
  geonameid: number;
  name: string;
}

export interface Asn {
  number: number;
  organisation: string;
}

export interface City {
  geonameid: number;
  name: string;
  population: number;
}

export interface Continent {
  geonameid: number;
  name: string;
  code: string;
}

export interface Languages {
  es: string;
}

export interface Flag {
  file: string;
  emoji: string;
  unicode: string;
}

export interface Country {
  geonameid: number;
  name: string;
  code: string;
  capital: string;
  area_size: string;
  population: number;
  phone_code: string;
  is_in_eu: boolean;
  languages: Languages;
  flag: Flag;
  tld: string;
}

export interface Currency {
  code: string;
  name: string;
}

export interface Security {
  is_tor: boolean;
  is_proxy: boolean;
  is_crawler: boolean;
  is_threat: boolean;
  is_thread: boolean;
}

export interface Time {
  timezone: string;
  gtm_offset: number;
  gmt_offset: number;
  is_daylight_saving: boolean;
  code: string;
}

export interface GeolocationInterface {
  ip: string;
  type: string;
  location: Location;
  postcode: string;
  area: Area;
  asn: Asn;
  city: City;
  continent: Continent;
  country: Country;
  currency: Currency;
  security: Security;
  time: Time;
  status: string;
}

export interface CurrencyInterface {
  base_currency_code: string;
  base_currency_name: string;
  amount: string;
  updated_date: string;
  rates: object;
  status: string;
}
