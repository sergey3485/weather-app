import { HourlyWeather } from './api';

export const filterHourlyWeather = (data: HourlyWeather[]) => {
  const currentDate = new Date();
  const filtredArray = data.filter((date) => +date.time >= +currentDate);

  return filtredArray.slice(0, 8);
};
