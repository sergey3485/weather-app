import * as React from 'react';
import { useParams } from 'react-router-dom';

import { LocationWeather } from '../../components/LocationWeather/LocationWeather';
import { DateTodo } from '../../components/DateTodo/DateTodo';
import { WeekList } from '../../components/WeekList/WeekList';

import { fetchWeather, FetchedWeather } from '../../utils/api';

import './weatherPage.css';

export const WeatherPage = (): JSX.Element => {
  const [weather, setWeather] = React.useState<FetchedWeather>();
  const params = useParams<{ city: string }>();
  React.useEffect(() => {
    fetchWeather(params.city)
      .then((data) => data.json())
      .then((data:FetchedWeather) => {
        setWeather(data);
        // eslint-disable-next-line no-console
        console.log(data);
      })
      // eslint-disable-next-line no-console
      .catch((error) => console.log(error));
  }, [params]);

  return (
    <div className="content-container">
      <div className="weather-header">
        <DateTodo />
        <LocationWeather
          location={`${weather?.nearest_area[0].region[0].value ?? ''}, ${weather?.nearest_area[0].country[0].value ?? ''}`}
          temperature={weather?.current_condition[0].temp_C}
          weatherDescription={weather?.current_condition[0].weatherDesc[0].value}
        />
      </div>
      <WeekList />
    </div>
  );
};
