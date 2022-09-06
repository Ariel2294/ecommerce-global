import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

export const getCurrentTime = (timeZone: string) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  return dayjs().tz(timeZone);
};

export const convertToSeconds = (date: Date, timeZone: string) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  return dayjs(date).tz(timeZone).unix();
};

export const getDateAdded = (
  value: number,
  unit: dayjs.ManipulateType,
  timeZone: string,
  unix?: boolean,
) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  if (!unix) {
    return dayjs().tz(timeZone).add(value, unit);
  }
  return (
    Number(dayjs().tz(timeZone).add(value, unit).unix()) -
    Number(dayjs().tz(timeZone).unix())
  );
};

export const getTimeExpiredCurrencies = (time: string, timeZone: string) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const splitTime = time.split(':');
  const dataTime = {
    hour: splitTime[0],
    minute: splitTime[1],
    second: splitTime[2],
  };

  return (
    dayjs()
      .hour(Number(dataTime.hour))
      .minute(Number(dataTime.minute))
      .second(Number(dataTime.second))
      .tz(timeZone)
      .unix() - dayjs().tz(timeZone).unix()
  );
};
