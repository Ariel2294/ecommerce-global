import { Users } from '../domain/user/schema/users.schema';

export const dataUserMock = (): Users => {
  return {
    first_name: 'hola',
    last_name: 'hola',
    email: 'corre@domain.com',
    password: 'teste',
    preferred_currency: 'USD',
    active: true,
    country: '63118ac7c1417731bb536f15',
  };
};
