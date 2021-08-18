import IconParth from '../../weather-icons/wi-day-rain.svg';

import './weekList.css';

export interface WeekListProps {
  hourly:string;
}

export const WeekList = (props: WeekListProps): JSX.Element => {
  const { hourly } = props;
  return (
    <div className="week-container">
      <div className="day-container">
        <div className="day">Today</div>
        <div className="day-icon">
          <img src={IconParth} alt="weather" className="icon" />
        </div>
        <div className="day-temperature">{hourly ?? ''}</div>
      </div>
    </div>
  );
};
