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

import { getCurrentHour } from '../../utils/time';

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
}

export const TodoModal = (props: TodoModalProps) => {
  const {
    todos,
    onClose,
    onSave,
    isOpen,
  } = props;

  const [text, setText] = React.useState('');
  const [modalTodos, setModalTodos] = React.useState(todos);
  const [isEditing, setIsEditing] = React.useState<string | boolean>(false);

  const modalWindowRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen === true) {
      setModalTodos(todos);
    }
  }, [todos, isOpen]);

  const endEditing = () => setIsEditing(false);
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

    const newTodo: Todo = {
      id: uuid.v4(),
      text,
      time: new Date(),
      done: false,
    };

    setModalTodos([...modalTodos, newTodo]);
    setText('');
  };

  const editTodo = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
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

  const saveChanges = () => {
    onSave(modalTodos);
    onClose();
  };

  return (
    <Modal modalContentRef={modalWindowRef} open={isOpen} onClose={onClose}>
      <div className={styles['modal-container']} ref={modalWindowRef}>
        <ButtonLogo onClick={onClose} variant="close-modal" className={styles.close}>
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
                          onKeyDown={editTodo}
                          onBlur={endEditing}
                          className={styles['todo-input']}
                        />
                      )}
                      <Text variant="h2" className={styles[`todo-text-modal${data.done ? '-done' : ''}`]}>{data.text}</Text>
                    </div>
                    <div className={styles['modal-menu']}>
                      <ButtonLogo variant="edit" onClick={() => startEditing(data.text)} className={styles['edit-text']}>
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
