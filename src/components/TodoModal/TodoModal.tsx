import * as React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import * as uuid from 'uuid';

import {
  RiCloseFill,
  RiEdit2Fill,
  RiDeleteBinLine,
  RiPlayListAddFill,
} from 'react-icons/ri';

import { Button } from '../Button';
import { Text } from '../Text';
import { Modal } from '../Modal';

import { getCurrentHour, changeTime } from '../../utils/time';

import { ButtonLogo } from '../ButtonLogo';
import styles from './todoModal.module.css';

export interface Todo {
  id: string;
  time: Date;
  text: string;
  done: boolean;
}

interface TodoModalProps {
  todos: Todo[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (newTodos: Todo[]) => void;
  currentTime: Date;
}

export const TodoModal = (props: TodoModalProps) => {
  const {
    todos,
    onClose,
    onSave,
    isOpen,
    currentTime,
  } = props;

  const [text, setText] = React.useState('');
  const [modalTodos, setModalTodos] = React.useState(todos);
  const [isEditing, setIsEditing] = React.useState<string | boolean>(false);
  const [hour, setHour] = React.useState<number>();
  const [min, setMin] = React.useState<number>();
  const [timeIndex, setTimeIndex] = React.useState(getCurrentHour(currentTime).ampm);
  const [todoHour, setTodoHour] = React.useState<number>();
  const [todoMin, setTodoMin] = React.useState<number>();
  const [todoTimeIndex, setTodoTimeIndex] = React.useState<string>();

  const modalWindowRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen === true) {
      setModalTodos(todos);
    }
  }, [todos, isOpen]);

  // const endEditing = () => setIsEditing(false);
  const startEditing = (data: string) => setIsEditing(data);

  const changeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.currentTarget.value;
    setText(newText);
  };

  const deleteTodo = (todo: Todo) => {
    const changedTodoList = [...modalTodos];
    changedTodoList.splice(changedTodoList.indexOf(todo), 1);
    setModalTodos(changedTodoList);
  };

  const addTodo = () => {
    if (text === '') return;

    const time = changeTime(hour, min, timeIndex, currentTime);

    const newTodo: Todo = {
      id: uuid.v4(),
      text,
      time: new Date(time),
      done: false,
    };

    setModalTodos([...modalTodos, newTodo]);
    setText('');
    setHour(undefined);
    setMin(undefined);
    setTimeIndex(getCurrentHour(currentTime).ampm);
  };

  const editTodo = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter') return;

    if (isEditing !== false) {
      const todoIndex = modalTodos.findIndex((item) => item.id === isEditing);
      const newTodo = {
        ...modalTodos[todoIndex],
        text: event.currentTarget.value,
        done: false,
      };

      setModalTodos([
        ...modalTodos.slice(0, todoIndex),
        newTodo,
        ...modalTodos.slice(todoIndex + 1, todos.length),
      ]);

      setIsEditing(false);
    }
  };

  const saveChanges = () => {
    onSave(modalTodos);
    onClose();
  };

  const changeHour = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newHour = +event.currentTarget.value <= 12 ? +event.currentTarget.value : 12;
    setHour(newHour);
  };

  const changeMinutes = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMinutes = +event.currentTarget.value <= 59 ? +event.currentTarget.value : 59;
    setMin(newMinutes);
  };

  const changeTimeIndex = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTimeIndex = event.currentTarget.value;
    setTimeIndex(newTimeIndex);
  };

  const changeTodoHour = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newHour = +event.currentTarget.value <= 12 ? +event.currentTarget.value : 12;
    setTodoHour(newHour);
    const time = new Date(changeTime(newHour, todoMin, todoTimeIndex, currentTime));

    const todoIndex = modalTodos.findIndex((item) => item.id === isEditing);

    const newTodo = {
      ...modalTodos[todoIndex],
      time,
      done: false,
    };

    setModalTodos([
      ...modalTodos.slice(0, todoIndex),
      newTodo,
      ...modalTodos.slice(todoIndex + 1, todos.length),
    ]);
  };

  const changeTodoMinutes = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMinutes = +event.currentTarget.value <= 59 ? +event.currentTarget.value : 59;
    setTodoMin(newMinutes);
    const time = new Date(changeTime(todoHour, newMinutes, todoTimeIndex, currentTime));
    const todoIndex = modalTodos.findIndex((item) => item.id === isEditing);
    const newTodo = {
      ...modalTodos[todoIndex],
      time,
      done: false,
    };

    setModalTodos([
      ...modalTodos.slice(0, todoIndex),
      newTodo,
      ...modalTodos.slice(todoIndex + 1, todos.length),
    ]);
  };

  const changeTodoTimeIndex = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTimeIndex = event.currentTarget.value;
    setTodoTimeIndex(newTimeIndex);
    const time = new Date(changeTime(todoHour, todoMin, newTimeIndex, currentTime));
    const todoIndex = modalTodos.findIndex((item) => item.id === isEditing);
    const newTodo = {
      ...modalTodos[todoIndex],
      time,
      done: false,
    };

    setModalTodos([
      ...modalTodos.slice(0, todoIndex),
      newTodo,
      ...modalTodos.slice(todoIndex + 1, todos.length),
    ]);
  };

  return (
    <Modal modalContentRef={modalWindowRef} open={isOpen} onClose={onClose}>
      <div className={styles['modal-container']} ref={modalWindowRef}>
        <ButtonLogo onClick={onClose} variant="close-modal" className={styles.close}>
          <RiCloseFill size={24} color="white" />
        </ButtonLogo>
        <Text variant="h1">Todo`s editor</Text>
        <div className={styles['add-header']}>
          <div className={styles['input-header']}>
            <div className={styles['time-input']}>
              <input
                type="number"
                className={styles['date-input']}
                onChange={changeHour}
                max={12}
                min={0}
                placeholder={getCurrentHour(currentTime).value.slice(0, 2)}
                value={hour ?? ''}
              />
              <Text variant="h2">:</Text>
              <input
                type="number"
                className={styles['date-input']}
                onChange={changeMinutes}
                max={59}
                min={0}
                placeholder={getCurrentHour(currentTime).value.slice(3, 5)}
                value={min ?? ''}
              />
              <select onChange={changeTimeIndex} className={styles['date-index']} value={timeIndex}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
            <textarea placeholder="   + Add Todo" value={text} onChange={changeText} className={styles['add-todo']} />
          </div>
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
                    <div className={styles['todo-time']}>
                      {isEditing === data.id && (
                        <div className={styles['todo-time-input']}>
                          <input
                            type="number"
                            className={styles['date-input']}
                            onChange={changeTodoHour}
                            max={12}
                            min={0}
                            placeholder={getCurrentHour(data.time).value.slice(0, 2)}
                            value={todoHour ?? ''}
                          />
                          <Text variant="h2">:</Text>
                          <input
                            type="number"
                            className={styles['date-input']}
                            onChange={changeTodoMinutes}
                            max={59}
                            min={0}
                            placeholder={getCurrentHour(data.time).value.slice(3, 5)}
                            value={todoMin ?? ''}
                          />
                          <select onChange={changeTodoTimeIndex} className={styles['date-index']} value={getCurrentHour(data.time).ampm}>
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                          </select>
                        </div>
                      )}
                      <Text variant="h2">{getCurrentHour(data.time).value}</Text>
                      <Text variant="h3" className={styles['time-modal']}>
                        {getCurrentHour(data.time).ampm}
                      </Text>
                    </div>
                    <div className={styles['todo-value']}>
                      {isEditing === data.id && (
                        <textarea
                          defaultValue={data.text}
                          // eslint-disable-next-line jsx-a11y/no-autofocus
                          autoFocus
                          onKeyDown={editTodo}
                          // onBlur={endEditing}
                          className={styles['todo-input']}
                        />
                      )}
                      <Text variant="h2" className={styles[`todo-text-modal${data.done ? '-done' : ''}`]}>
                        {data.text}
                      </Text>
                    </div>
                    <div className={styles['modal-menu']}>
                      <ButtonLogo
                        variant="edit"
                        onClick={() => startEditing(data.id)}
                        className={styles['edit-text']}
                      >
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
          <Button onClick={saveChanges} variant="save" className={styles.save}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};
