import * as React from 'react';

import { getCurrentHour, getCurrentDate } from '../../utils/time';

import './dateTodo.css';

export const DateTodo = (): JSX.Element => {
  const [date, setDate] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 10000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container-date-todo">
      <div className="date-time">
        <span><strong>{getCurrentHour(date).value}</strong></span>
        <span className="time-index"><strong>{getCurrentHour(date).ampm}</strong></span>
      </div>
      <div className="date-day">{getCurrentDate()}</div>
      <div className="todo-container">
        <button className="button-next" type="button">Next</button>
        <div className="todo-list">
          <div className="todo-item">
            <div className="todo-time">16:39</div>
            <div className="todo-text">Dinner at cafe</div>
          </div>
          <div className="todo-item">
            <div className="todo-time">16:39</div>
            <div className="todo-text">Go for a walk</div>
          </div>
        </div>
      </div>
    </div>
  );
};
