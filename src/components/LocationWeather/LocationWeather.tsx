import './locationWeather.css';
import { Skeleton } from '../Skeleton/Skeleton';

export interface LocationWeatherProps {
  location?: string;
  temperature?: string;
  weatherDescription?: string;
  iconPath?: string;
}

export const LocationWeather = (props: LocationWeatherProps): JSX.Element => {
  const {
    location,
    temperature,
    weatherDescription,
    iconPath,
  } = props;

  return (
    <div className="container-weather">
      <div className="weather-logo">
        {iconPath ? <img src={iconPath} alt="weather" className="logo" /> : <Skeleton width="100px" height="100px" />}
      </div>
      <div className="weather">
        {weatherDescription ? <strong>{weatherDescription}</strong> : <Skeleton width="200px" />}
      </div>
      <div className="location">
        {location ?? <Skeleton width="200px" height="20px" />}
      </div>
      <div className="temperature">
        {temperature ? (
          <strong>
            {temperature}
            °
          </strong>
        ) : <Skeleton width="200px" />}
      </div>
    </div>
  );
};
