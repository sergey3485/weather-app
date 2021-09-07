import * as React from 'react';
import { useParams } from 'react-router-dom';

import { LocationWeather } from '../../components/LocationWeather';
import { DateTodo } from '../../components/DateTodo';
import { HourlyList } from '../../components/HourlyList';

import { fetchWeather, Weather } from '../../utils/api';

import { ICON_CODES } from '../../constants/weatherCodes';

import styles from './weatherPage.module.css';

export const WeatherPage = (): JSX.Element => {
  const [weather, setWeather] = React.useState<Weather>();
  const params = useParams<{ city: string }>();

  React.useEffect(() => {
    fetchWeather(params.city)
      .then((data) => setWeather(data))
      // eslint-disable-next-line no-console
      .catch((error) => console.log(error));
  }, [params]);

  return (
    <div className={styles['content-container']}>
      <div className={styles['weather-header']}>
        <DateTodo />
        <LocationWeather
          location={weather?.position}
          temperature={weather?.temperature}
          weatherDescription={weather?.weatherDescription}
          iconPath={weather?.icon ? ICON_CODES[weather?.icon] : undefined}
        />
      </div>

      <HourlyList hourlyWeather={weather?.hourlyWeather ?? []} />
    </div>
  );
};
