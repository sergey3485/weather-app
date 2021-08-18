import * as React from 'react';

import { FullDate, getFullDate } from '../../utils/time';

import './dateTodo.css';

export const DateTodo = (): JSX.Element => {
  const [fullDate, setFullDate] = React.useState<FullDate>(getFullDate());

  React.useEffect(() => {
    const timer = setInterval(() => { setFullDate(getFullDate()); }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="container-date-todo">
      <div className="date-time">
        <span><strong>{fullDate.time}</strong></span>
        <span className="time-index"><strong>{fullDate.index}</strong></span>
      </div>
      <div className="date-day">{fullDate.date}</div>
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
