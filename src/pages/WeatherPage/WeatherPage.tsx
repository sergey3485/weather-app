import * as React from 'react';
import { useParams } from 'react-router-dom';

import { LocationWeather } from '../../components/LocationWeather/LocationWeather';
import { DateTodo } from '../../components/DateTodo/DateTodo';
import { HourlyList } from '../../components/HourlyList/HourlyList';

import { fetchWeather, Weather } from '../../utils/api';

import { ICON_CODES } from '../../constants/weatherCodes';

import './weatherPage.css';

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
    <div className="content-container">
      <div className="weather-header">
        <DateTodo />
        <LocationWeather
          location={weather?.position}
          temperature={weather?.temperature}
          weatherDescription={weather?.weatherDescription}
          iconPath={ICON_CODES[weather?.icon ?? '113']}
        />
      </div>

      <HourlyList hourlyWeather={weather?.hourlyWeather ?? []} />
    </div>
  );
};
