import iconParth from '../../weather-icons/wi-day-sunny.svg';
import './locationWeather.css';

export interface LocationWeatherProps {
  city: string;
}

export const LocationWeather = (props: LocationWeatherProps): JSX.Element => {
  const { city } = props;
  return (

    <div className="container-weather">
      <div className="weather-logo">
        <img src={iconParth} alt="weather" className="logo" />
      </div>
      <div className="weather">Clear Sky</div>
      <div className="location">{city}</div>
      <div className="temperature">16°</div>
    </div>
  );
};
