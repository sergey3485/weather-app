import { HourlyWeather } from '../../utils/api';
import { filterHourlyWeather } from '../../utils/filter';
import { getCurrentHour } from '../../utils/time';

import { ICON_CODES } from '../../constants/weatherCodes';

import './hourlyList.css';

export interface HourlyListProps {
  hourlyWeather: HourlyWeather[];
}

export const HourlyList = (props: HourlyListProps): JSX.Element => {
  const { hourlyWeather } = props;

  return (
    <div className="hourly-weather-container">
      {filterHourlyWeather(hourlyWeather).map((data) => {
        const time = getCurrentHour(data.time as Date);

        return (
          <div className="day-container">
            <div className="day">
              <span>{time.value}</span>
              <span className="time-index">{` ${time.ampm}`}</span>
            </div>
            <div className="day-icon">
              <img src={ICON_CODES[data.weatherCode]} alt="weather" className="icon" />
            </div>
            <div className="day-temperature">{data.tempC}</div>
          </div>
        );
      })}
    </div>
  );
};
