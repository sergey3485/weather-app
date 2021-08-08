import * as React from 'react';
import { useParams } from 'react-router-dom';

import './weatherPage.css';

export const WeatherPage = (): JSX.Element => {
  const params = useParams<{ city: string }>();

  return (
    <div>{params.city}</div>
  );
};
