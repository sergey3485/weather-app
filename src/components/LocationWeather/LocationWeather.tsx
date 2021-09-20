import { Skeleton } from '../Skeleton';
import { Text } from '../Text';

import styles from './locationWeather.module.css';

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
      {weatherDescription ? (
        <Text variant="weather">
          <strong>
            {weatherDescription}
          </strong>
        </Text>
      )
        : <Skeleton width="200px" />}
      {location ? (
        <Text variant="location">
          {location}
        </Text>
      )
        : <Skeleton width="200px" height="20px" />}
      {temperature ? (
        <Text variant="temperature">
          <strong>
            {temperature}
            °
          </strong>
        </Text>
      ) : <Skeleton width="200px" />}
    </div>
  );
};
