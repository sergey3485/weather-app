import * as React from 'react';
import { RiCloseFill, RiMenu3Line, RiEdit2Fill } from 'react-icons/ri';

import { Modal } from '../Modal';

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
  const [isOpen, setIsOpen] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const [modalTodos, setModalTodos] = React.useState(initialTodo);
  const [isEditing, setIsEditing] = React.useState<string | boolean>(false);

  const style = {
    transform: `translateY(-${step * 36}px)`,
    transition: '1s',
  };

  const closeModal = () => {
    setTodos(modalTodos);
    setIsOpen(false);
  };

  React.useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 10000);

    return () => clearInterval(timer);
  }, []);

  const deleteTodo = (todo: Todo) => {
    const changedTodoList = [...modalTodos];
    changedTodoList.splice(changedTodoList.indexOf(todo), 1);
    setModalTodos(changedTodoList);
  };

  const openModal = () => {
    setModalTodos(todos);
    setIsOpen(true);
  };

  const saveChanges = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;

    if (isEditing !== false) {
      const todoIndex = modalTodos.findIndex((item) => item.text === isEditing);
      const newTodo = {
        ...modalTodos[todoIndex],
        text: event.currentTarget.value,
      };

      setModalTodos([
        ...modalTodos.slice(0, todoIndex),
        newTodo,
        ...modalTodos.slice(todoIndex + 1, todos.length),
      ]);

      setIsEditing(false);
    }
  };

  const onNext = () => {
    if (step === todos.length) return;
    setStep((prevStep) => prevStep + 1);
  };

  const isTodosEmpty = todos.length === 0;

  return (
    <div className={styles['container-date-todo']}>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div className={styles['modal-container']}>
          <button type="button" onClick={() => setIsOpen(false)} className={styles['close-modal-button']}>
            <RiCloseFill size={24} color="white" />
          </button>
          <div className={styles['modal-header']}>Todo`s editor</div>
          <div className={styles['modal-todo-list']}>
            {modalTodos.map((data) => {
              return (
                <div className={styles['todo-item']}>
                  <div className={styles['todo-time']}>{data.time}</div>
                  {isEditing === data.text && (
                  <input
                    defaultValue={data.text}
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus
                    onKeyDown={saveChanges}
                    onBlur={() => setIsEditing(false)}
                  />
                  )}
                  {isEditing !== data.text && <div className={styles['todo-text']}>{data.text}</div>}
                  <button type="button" className={styles['edit-todo']} onClick={() => setIsEditing(data.text)}>
                    <RiEdit2Fill size={16} color="white" />
                  </button>
                  <button type="button" className={styles['delete-button']} onClick={() => deleteTodo(data)}>
                    Delete
                  </button>
                </div>
              );
            })}
            <button type="button" onClick={closeModal}>Save</button>
          </div>
        </div>
      </Modal>
      <div>
        <span className={styles['date-time']}>
          <strong>{getCurrentHour(date).value}</strong>
        </span>
        <span className={styles['time-index']}>
          <strong>{getCurrentHour(date).ampm}</strong>
        </span>
      </div>
      <div className={styles['date-day']}>{getCurrentDate()}</div>
      <div className={styles['todo-container']}>
        <div>
          {!isTodosEmpty && (
            <button className={styles['button-next']} type="button" onClick={onNext}>
              Next
            </button>
          )}
          <button className={styles['button-menu']} type="button" onClick={openModal}>
            <RiMenu3Line color="white" />
          </button>
        </div>

        {isTodosEmpty && (
          <div className={styles['todo-done']}>На сегодня планов нет</div>
        )}

        {!isTodosEmpty && (
          <div className={styles['visible-todo-list']}>
            <div className={styles['todo-list']} style={style}>
              {todos.map((data) => {
                return (
                  <div className={styles['todo-item']}>
                    <div className={styles['todo-time']}>{data.time}</div>
                    <div className={styles['todo-text']}>{data.text}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
