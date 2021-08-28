import * as React from 'react';
import { useParams } from 'react-router-dom';

import { LocationWeather } from '../../components/LocationWeather/LocationWeather';
import { DateTodo, Todo } from '../../components/DateTodo/DateTodo';
import { HourlyList } from '../../components/HourlyList/HourlyList';

import { fetchWeather, Weather } from '../../utils/api';

import { ICON_CODES } from '../../constants/weatherCodes';

import './weatherPage.css';

const initialTodo: Todo[] = [
  {
    time: '12:03',
    text: 'Посетить врача',
  },
  {
    time: '13:00',
    text: 'Пообедать',
  },
  {
    time: '14:00',
    text: 'Подразнить попугаев',
  },
  {
    time: '15:10',
    text: 'Помыть посуду',
  },
  {
    time: '16:20',
    text: 'Сделать таски',
  },
  {
    time: '17:05',
    text: 'Доебаться до Руслана',
  },
  {
    time: '18:25',
    text: 'Послушать истории от Деда',
  },
];

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
        <DateTodo todo={initialTodo} />
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
