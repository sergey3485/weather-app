export interface FullDate {
  time: string;
  index: string;
  date: string;
}
interface FullTime {
  value: string;
  index: string;
}
const getCurrentTime = ():FullTime => {
  const date = new Date();
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
    time: getCurrentTime().value,
    index: getCurrentTime().index,
    date: getCurrentDate(),
  };
};

export interface TimeCode {
  time: string;
  index: string;
}

export const timeCode: Record<string, TimeCode> = {
  0: {
    time: '12:00',
    index: 'AM',
  },
  300: {
    time: '03:00',
    index: 'AM',
  },
  600: {
    time: '06:00',
    index: 'AM',
  },
  900: {
    time: '09:00',
    index: 'AM',
  },
  1200: {
    time: '12:00',
    index: 'PM',
  },
  1500: {
    time: '03:00',
    index: 'PM',
  },
  1800: {
    time: '06:00',
    index: 'PM',
  },
  2100: {
    time: '09:00',
    index: 'PM',
  },
};
