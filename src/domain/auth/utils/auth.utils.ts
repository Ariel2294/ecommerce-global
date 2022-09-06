import { getCurrentTime } from '../../../utils';
import * as dayjs from 'dayjs';

export const validationExpireTokenVerify = (
  timeZone: string,
  expirationDate: Date,
) => {
  const currentTime = getCurrentTime(timeZone);

  return dayjs(currentTime).isAfter(expirationDate);
};
