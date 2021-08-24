import { getCurrentHour } from '../../utils/time';
import './weekList.css';

export interface WeekListProps {
  hourly: string;
  iconPath: string;
  timeCode: Date;
}

export const WeekList = (props: WeekListProps): JSX.Element => {
  const { hourly, iconPath, timeCode } = props;
  const time = getCurrentHour(timeCode);
  return (
    <div className="day-container">
      <div className="day">
        <span>{time.value}</span>
        <span className="time-index">{` ${time.index}`}</span>
      </div>
      <div className="day-icon">
        <img src={iconPath} alt="weather" className="icon" />
      </div>
      <div className="day-temperature">{hourly ?? ''}</div>
    </div>
  );
};
