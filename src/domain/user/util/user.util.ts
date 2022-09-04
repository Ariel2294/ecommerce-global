import { FilterQuery } from 'mongoose';
import { UserFilterDto } from '../dto/user.dto';
import { Users, UsersDocument } from '../schema/users.schema';

export const userCreateDataResponse = (user: UsersDocument) => {
  return {
    _id: user._id,
  };
};

export const getUserParams = (filter: UserFilterDto): FilterQuery<Users> => {
  if (!filter.userId) {
    const regex = new RegExp(filter.search, 'i');
    return {
      $or: [
        {
          first_name: regex,
        },
        {
          last_name: regex,
        },
        {
          email: regex,
        },
      ],
    };
  }

  return {
    _id: filter.userId,
  };
};

export const userFindDataResponse = (
  filter: UserFilterDto,
  users,
  count: number,
) => {
  if (!filter.userId) {
    const limit = filter.limit || 10;
    const pages = Math.ceil(count / limit);
    return {
      metaData: {
        total: count,
        pages,
      },
      data: users,
    };
  }

  return users[0];
};
