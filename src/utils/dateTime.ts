import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

export const getCurrentTime = (timeZone: string) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  return dayjs().tz(timeZone);
};
