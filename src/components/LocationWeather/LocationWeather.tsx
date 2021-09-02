import styles from './locationWeather.module.css';
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
    <div className={styles['container-weather']}>
      <div className={styles['weather-logo']}>
        {iconPath ? <img src={iconPath} alt="weather" className={styles.logo} /> : <Skeleton width="100px" height="100px" />}
      </div>
      <div className={styles.weather}>
        {weatherDescription ? <strong>{weatherDescription}</strong> : <Skeleton width="200px" />}
      </div>
      <div className={styles.location}>
        {location ?? <Skeleton width="200px" height="20px" />}
      </div>
      <div className={styles.temperature}>
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
