import * as React from 'react';
import { useParams } from 'react-router-dom';

import { LocationWeather } from '../../components/LocationWeather/LocationWeather';
import { DateTodo } from '../../components/DateTodo/DateTodo';
import { WeekList } from '../../components/WeekList/WeekList';
import { code } from '../../weather-icons/index';

import { fetchWeather, UsefullData } from '../../utils/api';
import { filter } from '../../utils/filter';

import './weatherPage.css';

export const WeatherPage = (): JSX.Element => {
  const [weather, setWeather] = React.useState<UsefullData>();
  const params = useParams<{ city: string }>();
  React.useEffect(() => {
    fetchWeather(params.city)
      .then((data) => {
        setWeather(data);
      })
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
          iconPath={code[weather?.icon ?? '113']}
        />
      </div>
      <div className="hourly-weather-container">
        { filter(weather?.hour ?? []).map((data) => (
          <WeekList
            key={data.uvIndex}
            hourly={data.tempC}
            iconPath={code[data.weatherCode]}
            timeCode={data.time as Date}
          />
        ))}
      </div>
    </div>
  );
};
