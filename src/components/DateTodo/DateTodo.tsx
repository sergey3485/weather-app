import * as React from 'react';
import { RiCloseFill, RiMenu3Line, RiEdit2Fill } from 'react-icons/ri';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { Modal } from '../Modal';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button } from '../Button';
import { Text } from '../Text';

import { getCurrentHour, getCurrentDate } from '../../utils/time';

import styles from './dateTodo.module.css';
import { ButtonLogo } from '../ButtonLogo';

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

  // eslint-disable-next-line no-console
  console.log(styles);

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
          <ButtonLogo handler={() => setIsOpen(false)} variant="close-modal">
            <RiCloseFill size={24} color="white" />
          </ButtonLogo>
          <Text variant="modal-header">Todo`s editor</Text>
          <div className={styles['modal-todo-list']}>
            <TransitionGroup>
              {modalTodos.map((data) => {
                return (
                  <CSSTransition
                    key={data.time}
                    timeout={250}
                    classNames={{
                      enterActive: styles['animation-todo-item-enter-active'],
                      enter: styles['animation-todo-item-enter'],
                      exit: styles['animation-todo-item-exit'],
                      exitActive: styles['animation-todo-item-exit-active'],
                    }}
                  >
                    <div className={styles['todo-item']}>
                      <Text variant="todo-time">{data.time}</Text>
                      {isEditing === data.text && (
                        <input
                          defaultValue={data.text}
                          // eslint-disable-next-line jsx-a11y/no-autofocus
                          autoFocus
                          onKeyDown={saveChanges}
                          onBlur={() => setIsEditing(false)}
                        />
                      )}
                      {isEditing !== data.text && <Text variant="todo-text">{data.text}</Text>}
                      <ButtonLogo variant="edit" handler={() => setIsEditing(data.text)}>
                        <RiEdit2Fill size={8} color="white" />
                      </ButtonLogo>
                      <Button handler={() => deleteTodo(data)} variant="delete">
                        Delete
                      </Button>
                    </div>
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
            <Button handler={closeModal} variant="save">
              Save
            </Button>
          </div>
        </div>
      </Modal>
      <div>
        <Text variant="date-time">
          <strong>{getCurrentHour(date).value}</strong>
        </Text>
        <Text variant="time-index">
          <strong>{getCurrentHour(date).ampm}</strong>
        </Text>
      </div>
      <Text variant="date-day">{getCurrentDate()}</Text>
      <div className={styles['todo-container']}>
        <div className={styles['menu-container']}>
          {!isTodosEmpty && (
            <Button handler={onNext} variant="next">
              Next
            </Button>
          )}
          <ButtonLogo variant="menu" handler={openModal}>
            <RiMenu3Line color="white" />
          </ButtonLogo>
        </div>

        {isTodosEmpty && <Text variant="todo-done">На сегодня планов нет</Text>}

        {!isTodosEmpty && (
          <div className={styles['visible-todo-list']}>
            <div className={styles['todo-list']} style={style}>
              <TransitionGroup>
                {todos.map((data) => {
                  return (
                    <CSSTransition
                      key={data.time}
                      timeout={400}
                      classNames={{
                        exit: styles['animation-main-todo-item-exit'],
                        exitActive: styles['animation-main-todo-item-exit-active'],
                      }}
                    >
                      <div className={styles['todo-item']}>
                        <Text variant="time">{data.time}</Text>
                        <Text variant="todo-text">{data.text}</Text>
                      </div>
                    </CSSTransition>
                  );
                })}
              </TransitionGroup>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
