import './locationWeather.css';

export interface LocationWeatherProps {
  location?: string;
  temperature?: string;
  weatherDescription?: string;
  iconPath: string;
}

export const LocationWeather = (props: LocationWeatherProps): JSX.Element => {
  const {
    location = 'loading',
    temperature = 'loading',
    weatherDescription = 'loading',
    iconPath,
  } = props;

  return (
    <div className="container-weather">
      <div className="weather-logo">
        <img src={iconPath} alt="weather" className="logo" />
      </div>
      <div className="weather">
        <strong>{weatherDescription}</strong>
      </div>
      <div className="location">{location}</div>
      <div className="temperature">
        <strong>
          {temperature}
          °
        </strong>
      </div>
    </div>
  );
};
