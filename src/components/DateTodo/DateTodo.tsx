import * as React from 'react';

import { Modal } from '../Modal';

import { getCurrentHour, getCurrentDate } from '../../utils/time';
import iconPath from '../../assets/weather-icons/menu.svg';

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
  const [isOpen, setIsOpen] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const [modalTodos, setModalTodos] = React.useState(initialTodo);

  const closeModal = () => {
    setTodos(modalTodos);
    setIsOpen(false);
  };

  React.useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 10000);

    return () => clearInterval(timer);
  }, []);

  const deleteTodo = (todo:Todo) => {
    const changedTodoList = [...modalTodos];
    changedTodoList.splice(changedTodoList.indexOf(todo), 1);
    setModalTodos(changedTodoList);
  };

  const openModal = () => {
    setModalTodos(todos);
    setIsOpen(true);
  };

  return (
    <div className={styles['container-date-todo']}>
      <Modal open={isOpen} onClose={closeModal}>
        <button type="button" onClick={closeModal}>close</button>
        <div className={styles['modal-todo-list']}>
          {modalTodos.map((data) => {
            return (
              <div className={styles['todo-item']}>
                <div className={styles['todo-time']}>{data.time}</div>
                <div className={styles['todo-text']}>{data.text}</div>
                <button type="button" className={styles['delete-button']} onClick={() => deleteTodo(data)}>detele</button>
              </div>
            );
          })}
        </div>
      </Modal>
      <div className={styles['date-time']}>
        <span><strong>{getCurrentHour(date).value}</strong></span>
        <span className={styles['time-index']}><strong>{getCurrentHour(date).ampm}</strong></span>
      </div>
      <div className={styles['date-day']}>{getCurrentDate()}</div>
      <div className={styles['todo-container']}>
        {todos.length === 0 ? (
          <div>
            <button type="button" className={styles['button-menu']} onClick={openModal}>
              <img src={iconPath} alt="" className={styles.logo} />
            </button>
            <div className={styles['todo-done']}>На сегодня планов нет</div>
          </div>
        ) : (
          <div>
            <button className={styles['button-next']} type="button" onClick={() => setStep(step + 1)}>Next</button>
            <button className={styles['button-menu']} type="button" onClick={openModal}>
              <img src={iconPath} alt="" className={styles.logo} />
            </button>
          </div>
        )}
        <div className={styles['todo-list']}>
          {todos.slice(step, step + 2).map((data) => {
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
