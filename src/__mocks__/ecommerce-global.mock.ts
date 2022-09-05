export const mockHello =
  'Hello Welcome to e-commerce global made in El Salvador by engineer Osmin Ariel López Claros!';

export const mockEnv = {
  NODE_ENV: 'NODE_ENV',
  PORT: '9000',
  DATABASE_URI: 'mongodb://user:password@host:port/db',
  CORS_ORIGIN: '*',
  TOKEN_ENCRYPTION: '12345',
  JWT_SECRET: '123455',
  TZ: 'America/El_Salvador',
  GEO_API_KEY: 'key',
  CACHE_REDIS_URL: 'redis://localhost:6379',
  CACHE_REDIS_DEFAULT_TTL: 10,
  GEO_API_BASE_URL: 'https://api.getgeoapi.com/v2/',
  CURRENCY_SYSTEM: 'USD',
  CURRENCY_EXPIRE_HOUR: '23:59:59',
  CACHE_REDIS_DEFAULT_GEO_EXPIRE: 24,
};

export const mockConfigService = {
  get: jest.fn((key: string) => {
    return 'test' + key;
  }),
};
