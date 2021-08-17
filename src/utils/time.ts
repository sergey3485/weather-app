export interface FullDate {
  time: string;
  date: string;
}
const getCurrentTime = ():string => {
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return `${hour > 9 ? hour : `0${hour}`}:${minutes > 9 ? minutes : `0${minutes}`}`;
};

const getCurrentDate = ():string => {
  const date = new Date();
  const dateFormat = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (dateFormat.format(date));
};

export const getFullDate = ():FullDate => {
  return {
    time: getCurrentTime(),
    date: getCurrentDate(),
  };
};
