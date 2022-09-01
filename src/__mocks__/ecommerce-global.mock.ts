export const mockHello =
  'Hello Welcome to e-commerce global made in El Salvador by engineer Osmin Ariel López Claros!';

export const mockEnv = {
  NODE_ENV: 'NODE_ENV',
  PORT: '3333',
};

export const configServiceMock = {
  get(key: string): string {
    return mockEnv[key];
  },
};
