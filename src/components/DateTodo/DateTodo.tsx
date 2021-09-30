import * as React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import * as uuid from 'uuid';

import {
  RiCloseFill,
  RiMenu3Line,
  RiEdit2Fill,
  RiDeleteBinLine,
  RiPlayListAddFill,
} from 'react-icons/ri';
import { Modal } from '../Modal';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button } from '../Button';
import { Text } from '../Text';

import { getCurrentHour, getCurrentDate } from '../../utils/time';

import styles from './dateTodo.module.css';
import { ButtonLogo } from '../ButtonLogo';

export interface Todo {
  id: string;
  time: Date;
  text: string;
  done: boolean;
}

const initialTodo: Todo[] = [
  {
    id: uuid.v4(),
    time: new Date(),
    text: 'Посетить врача',
    done: false,
  },
  {
    id: uuid.v4(),
    time: new Date(),
    text: 'Пообедать',
    done: false,
  },
  {
    id: uuid.v4(),
    time: new Date(),
    text: 'Подразнить попугаев',
    done: false,
  },
  {
    id: uuid.v4(),
    time: new Date(),
    text: 'Помыть посуду',
    done: false,
  },
  {
    id: uuid.v4(),
    time: new Date(),
    text: 'Сделать таски',
    done: false,
  },
  {
    id: uuid.v4(),
    time: new Date(),
    text: 'Доебаться до Руслана',
    done: false,
  },
  {
    id: uuid.v4(),
    time: new Date(),
    text: 'Послушать истории от Деда',
    done: false,
  },
  {
    id: uuid.v4(),
    time: new Date(),
    text: 'Поиграть в лол',
    done: false,
  },
];

export const DateTodo = (): JSX.Element => {
  const [date, setDate] = React.useState(new Date());
  const [todos, setTodos] = React.useState(initialTodo);
  const [isOpen, setIsOpen] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const [modalTodos, setModalTodos] = React.useState(initialTodo);
  const [isEditing, setIsEditing] = React.useState<string | boolean>(false);
  const [text, setText] = React.useState('');

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

  const saveChanges = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
    todos[step].done = true;
    setStep((prevStep) => prevStep + 1);
  };

  const changeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.currentTarget.value;
    setText(newText);
  };

  const addTodo = () => {
    if (text === '') return;

    const newTodo: Todo = {
      id: uuid.v4(),
      text,
      time: date,
      done: false,
    };

    setModalTodos([...modalTodos, newTodo]);
    setText('');
  };

  const isTodosEmpty = todos.length === 0;
  const modalWindow = React.useRef<HTMLDivElement>(null);

  return (
    <div className={styles['container-date-todo']}>
      <Modal open={isOpen} onClose={() => setIsOpen(false)} modalContentRef={modalWindow}>
        <div className={styles['modal-container']} ref={modalWindow}>
          <ButtonLogo onClick={() => setIsOpen(false)} variant="close-modal" className={styles.close}>
            <RiCloseFill size={24} color="white" />
          </ButtonLogo>
          <Text variant="h1">Todo`s editor</Text>
          <div className={styles['add-header']}>
            <textarea
              placeholder="   + Add Todo"
              value={text}
              onChange={changeText}
              className={styles['add-todo']}
            />
            <ButtonLogo variant="menu" onClick={addTodo}>
              <RiPlayListAddFill size={32} color="white" />
            </ButtonLogo>
          </div>
          <div className={styles['modal-todo-list']}>
            <TransitionGroup>
              {modalTodos.map((data) => {
                return (
                  <CSSTransition
                    key={data.id}
                    timeout={400}
                    classNames={{
                      enterActive: styles['animation-todo-item-enter-active'],
                      enter: styles['animation-todo-item-enter'],
                      exit: styles['animation-todo-item-exit'],
                      exitActive: styles['animation-todo-item-exit-active'],
                    }}
                  >
                    <div className={styles['todo-item-modal']}>
                      <Text variant="h2">{getCurrentHour(data.time).value}</Text>
                      <Text variant="h3" className={styles['time-modal']}>{getCurrentHour(data.time).ampm}</Text>
                      <div className={styles['todo-value']}>
                        {isEditing === data.text && (
                          <textarea
                            defaultValue={data.text}
                            // eslint-disable-next-line jsx-a11y/no-autofocus
                            autoFocus
                            onKeyDown={saveChanges}
                            onBlur={() => setIsEditing(false)}
                            className={styles['todo-input']}
                          />
                        )}
                        <Text variant="h2" className={styles[`todo-text-modal${data.done ? '-done' : ''}`]}>{data.text}</Text>
                      </div>
                      <div className={styles['modal-menu']}>
                        <ButtonLogo variant="edit" onClick={() => setIsEditing(data.text)} className={styles['edit-text']}>
                          <RiEdit2Fill size={20} color="white" />
                        </ButtonLogo>
                        <Button onClick={() => deleteTodo(data)} variant="delete" className={styles.delete}>
                          <RiDeleteBinLine size={20} color="white" />
                        </Button>
                      </div>
                    </div>
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
            <Button onClick={closeModal} variant="save" className={styles.save}>
              Save
            </Button>
          </div>
        </div>
      </Modal>
      <div className={styles['time-header']}>
        <Text variant="h5">
          <strong>{getCurrentHour(date).value}</strong>
        </Text>
        <Text variant="text">
          <strong>{getCurrentHour(date).ampm}</strong>
        </Text>
      </div>
      <Text variant="date-day">{getCurrentDate()}</Text>
      <div className={styles['todo-container']}>
        <div className={styles['menu-container']}>
          {!isTodosEmpty && (
            <Button onClick={onNext} variant="next" className={styles.next}>
              Next
            </Button>
          )}
          <ButtonLogo variant="button" onClick={openModal} className={styles['menu-todo']}>
            <RiMenu3Line color="white" />
          </ButtonLogo>
        </div>

        {isTodosEmpty && <Text variant="h2" className={styles['todo-done']}>На сегодня планов нет</Text>}

        {!isTodosEmpty && (
          <div className={styles['visible-todo-list']}>
            <div className={styles['todo-list']} style={style}>
              <TransitionGroup>
                {todos.map((data) => {
                  return (
                    <CSSTransition
                      key={data.id}
                      timeout={400}
                      classNames={{
                        exit: styles['animation-main-todo-item-exit'],
                        exitActive: styles['animation-main-todo-item-exit-active'],
                      }}
                    >
                      <div className={styles['todo-item']}>
                        <Text variant="h2">{getCurrentHour(data.time).value}</Text>
                        <Text variant="h3" className={styles.time}>{getCurrentHour(data.time).ampm}</Text>
                        <Text variant="h2" className={styles['todo-text']}>{data.text}</Text>
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
