export interface FullTime {
  value: string;
  ampm: string;
}

export interface TimeCode {
  time: string;
  index: string;
}

export const getCurrentHour = (date: Date): FullTime => {
  const dateFormat = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const dateText = dateFormat.format(date);
  const gap = dateText.length - 2;

  return {
    value: dateText.slice(0, gap),
    ampm: dateText.slice(gap, dateText.length),
  };
};

export const getCurrentDate = (): string => {
  const date = new Date();
  const dateFormat = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (dateFormat.format(date));
};

export const changeTime = (
  hour: number | undefined,
  min: number | undefined,
  index: string | undefined,
  currentTime: Date,
): number => {
  const dateHour = hour === 12 ? 0 : hour;
  const currentHour = dateHour ?? +getCurrentHour(currentTime).value.slice(0, 2);
  const currentMin = min ?? +getCurrentHour(currentTime).value.slice(3, 5);

  return (new Date().setHours(index === 'AM' ? currentHour : currentHour + 12, currentMin));
};
