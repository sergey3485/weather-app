import { Hourly } from './api';

export const filter = (data:Hourly[]) => {
  const currentDate = new Date();
  const filtredArray = data.filter((date) => +date.time >= +currentDate);

  return filtredArray.slice(0, 8);
};
