import './weekList.css';

export interface WeekListProps {
  hourly:string;
  iconPath:string;
}

export const WeekList = (props: WeekListProps): JSX.Element => {
  const { hourly, iconPath } = props;
  return (
    <div className="week-container">
      <div className="day-container">
        <div className="day">Today</div>
        <div className="day-icon">
          <img src={iconPath} alt="weather" className="icon" />
        </div>
        <div className="day-temperature">{hourly ?? ''}</div>
      </div>
    </div>
  );
};
