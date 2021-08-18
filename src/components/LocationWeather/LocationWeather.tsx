import iconParth from '../../weather-icons/wi-day-sunny.svg';

import './locationWeather.css';

export interface LocationWeatherProps {
  location?: string;
  temperature?: string;
  weatherDescription?: string;
}

export const LocationWeather = (props: LocationWeatherProps): JSX.Element => {
  const { location = 'loading', temperature = 'loading', weatherDescription = 'loading' } = props;
  return (
    <div className="container-weather">
      <div className="weather-logo">
        <img src={iconParth} alt="weather" className="logo" />
      </div>
      <div className="weather"><strong>{weatherDescription}</strong></div>
      <div className="location">{location}</div>
      <div className="temperature"><strong>{`${temperature}°`}</strong></div>
    </div>
  );
};
