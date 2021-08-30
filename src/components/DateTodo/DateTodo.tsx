import * as React from 'react';

import { getCurrentHour, getCurrentDate } from '../../utils/time';

import './dateTodo.css';

export interface Todo {
  time: string;
  text: string;
}

export interface DateTodoProps {
  todo: Todo[];
}

export const DateTodo = (props: DateTodoProps): JSX.Element => {
  const { todo } = props;
  const [date, setDate] = React.useState(new Date());
  const [count, setCounter] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 10000);

    return () => clearInterval(timer);
  }, []);

  // const onClick = () => {
  //   const length = todo.length % 2 === 0 ? todo.length : todo.length + 1;
  //   const counter = (count + 1) * 2 + 1 <= length ? (count + 1) : 0;
  //   setCounter(counter);
  // };

  // const filterTodoList = (data: Todo[], i: number): Todo[] => {
  //   if ((todo.length % 2 === 1) && (count * 2 === todo.length - 1)) {
  //     return [data[i * 2]];
  //   }
  //   return [data[i * 2], data[i * 2 + 1]];
  // };
  const onClick = () => {
    // const length = todo.length % 2 === 0 ? todo.length : todo.length + 1;
    const counter = count + 1;
    setCounter(counter);
  };

  const filterTodoList = (data: Todo[]): Todo[] => {
    // if (count === todo.length - 1) {
    //   return [data[i]];
    // } else if (count < todo.length) {
    //   return [data[i], data[i + 1]];
    // } else  (count === todo.length) {
    //   return [{time: '', text: ''}];
    // }
    // if (count === todo.length - 1) {
    //   return [data[count], data[count + 1] ? data[count + 1] : { time: '', text: '' }];
    // }
    return [data[count] ?? { time: '', text: '' }, data[count + 1] ?? { time: '', text: '' }];
  };

  return (
    <div className="container-date-todo">
      <div className="date-time">
        <span><strong>{getCurrentHour(date).value}</strong></span>
        <span className="time-index"><strong>{getCurrentHour(date).ampm}</strong></span>
      </div>
      <div className="date-day">{getCurrentDate()}</div>
      <div className="todo-container">
        {count === todo.length ? (
          <button className="button-next" type="button">Add Todo</button>
        ) : (
          <div>
            <button className="button-next" type="button" onClick={onClick}>Next</button>
            <button className="button-next" type="button">Add Todo</button>
          </div>
        )}
        <div className="todo-list">
          {filterTodoList(todo).map((data) => {
            return (
              <div className="todo-item">
                <div className="todo-time">{data.time}</div>
                <div className="todo-text">{data.text}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
