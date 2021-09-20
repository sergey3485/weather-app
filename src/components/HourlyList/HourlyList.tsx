import { HourlyWeather } from '../../utils/api';
import { filterHourlyWeather } from '../../utils/filter';
import { getCurrentHour } from '../../utils/time';

import { Text } from '../Text';

import { ICON_CODES } from '../../constants/weatherCodes';

import styles from './hourlyList.module.css';

export interface HourlyListProps {
  hourlyWeather: HourlyWeather[];
}

export const HourlyList = (props: HourlyListProps): JSX.Element => {
  const { hourlyWeather } = props;

  return (
    <div className={styles['hourly-weather-container']}>
      {filterHourlyWeather(hourlyWeather).map((data) => {
        const time = getCurrentHour(data.time as Date);

        return (
          <div className={styles['day-container']}>
            <div className={styles.day}>
              <Text variant="time">{time.value}</Text>
              <Text variant="time-index">{` ${time.ampm}`}</Text>
            </div>
            <div className="day-icon">
              <img src={ICON_CODES[data.weatherCode]} alt="weather" className={styles.icon} />
            </div>
            <Text variant="day-temperature">{data.tempC}</Text>
          </div>
        );
      })}
    </div>
  );
};
