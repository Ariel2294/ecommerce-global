import { dataUserMock } from '../../../__mocks__/users.mock';
import { MockModel } from '../../../__mocks__/database.mock';
import { Users } from '../schema/users.schema';

export class UserModel extends MockModel<Users> {
  protected entityStub = dataUserMock();
}
