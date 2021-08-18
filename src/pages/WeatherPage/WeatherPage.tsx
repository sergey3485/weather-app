import * as React from 'react';
import { useParams } from 'react-router-dom';

import { LocationWeather } from '../../components/LocationWeather/LocationWeather';
import { DateTodo } from '../../components/DateTodo/DateTodo';
import { WeekList } from '../../components/WeekList/WeekList';

import { fetchWeather, UsefullData } from '../../utils/api';

import './weatherPage.css';

export const WeatherPage = (): JSX.Element => {
  const [weather, setWeather] = React.useState<UsefullData>();
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
        />
      </div>
      <div className="hourly-weather-container">
        { weather?.hour.map((data) => (
          <WeekList key={data.time} hourly={data.tempC} />
        ))}
      </div>
    </div>
  );
};
