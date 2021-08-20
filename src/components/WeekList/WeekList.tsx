import './weekList.css';
import { TimeCode } from '../../utils/time';

export interface WeekListProps {
  hourly: string;
  iconPath: string;
  timeCode: TimeCode;
}

export const WeekList = (props: WeekListProps): JSX.Element => {
  const { hourly, iconPath, timeCode } = props;
  return (
    <div className="week-container">
      <div className="day-container">
        <div className="day">
          <span>{timeCode.time}</span>
          <span className="time-index">{` ${timeCode.index}`}</span>
        </div>
        <div className="day-icon">
          <img src={iconPath} alt="weather" className="icon" />
        </div>
        <div className="day-temperature">{hourly ?? ''}</div>
      </div>
    </div>
  );
};
