import * as React from 'react';
import { useParams } from 'react-router-dom';
import { LocationWeather } from '../../components/LocationWeather/LocationWeather';
import { DateTodo } from '../../components/DateTodo/DateTodo';
import { WeekList } from '../../components/WeekList/WeekList';

import './weatherPage.css';

export const WeatherPage = (): JSX.Element => {
  const params = useParams<{ city: string }>();

  return (
    <div className="content-container">
      <div className="weather-header">
        <DateTodo />
        <LocationWeather city={params.city} />
      </div>
      <WeekList />
    </div>
  );
};
