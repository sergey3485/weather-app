import * as React from 'react';

import { getCurrentHour, getCurrentDate } from '../../utils/time';

import styles from './dateTodo.module.css';

export interface Todo {
  time: string;
  text: string;
}

const initialTodo: Todo[] = [
  {
    time: '12:03',
    text: 'Посетить врача',
  },
  {
    time: '13:00',
    text: 'Пообедать',
  },
  {
    time: '14:00',
    text: 'Подразнить попугаев',
  },
  {
    time: '15:10',
    text: 'Помыть посуду',
  },
  {
    time: '16:20',
    text: 'Сделать таски',
  },
  {
    time: '17:05',
    text: 'Доебаться до Руслана',
  },
  {
    time: '18:25',
    text: 'Послушать истории от Деда',
  },
  {
    time: '19:02',
    text: 'Поиграть в лол',
  },
];

export const DateTodo = (): JSX.Element => {
  const [date, setDate] = React.useState(new Date());
  const [todos, setTodos] = React.useState(initialTodo);

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
    const newtodos = todos;
    newtodos.shift();
    setTodos([...newtodos]);
  };

  return (
    <div className={styles['container-date-todo']}>
      <div className={styles['date-time']}>
        <span><strong>{getCurrentHour(date).value}</strong></span>
        <span className={styles['time-index']}><strong>{getCurrentHour(date).ampm}</strong></span>
      </div>
      <div className={styles['date-day']}>{getCurrentDate()}</div>
      <div className={styles['todo-container']}>
        {todos.length === 0 ? (
          <div>
            <button className={styles['button-next']} type="button">Add Todo</button>
            <div className={styles['todo-done']}>На сегодня планов нет</div>
          </div>
        ) : (
          <div>
            <button className={styles['button-next']} type="button" onClick={onClick}>Next</button>
            <button className={styles['button-next']} type="button">Add Todo</button>
          </div>
        )}
        <div className={styles['todo-list']}>
          {todos.slice(0, 2).map((data) => {
            return (
              <div className={styles['todo-item']}>
                <div className={styles['todo-time']}>{data.time}</div>
                <div className={styles['todo-text']}>{data.text}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
