export interface FullDate {
  time: string;
  index: string;
  date: string;
}
export interface FullTime {
  value: string;
  index: string;
}

export const getCurrentHour = (date: Date):FullTime => {
  const dateFormat = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const dateText = dateFormat.format(date);
  const gap = dateText.length - 2;
  return {
    value: dateText.slice(0, gap),
    index: dateText.slice(gap, dateText.length),
  };
};

export const getCurrentDate = ():string => {
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
    time: getCurrentHour(new Date()).value,
    index: getCurrentHour(new Date()).index,
    date: getCurrentDate(),
  };
};

export interface TimeCode {
  time: string;
  index: string;
}
