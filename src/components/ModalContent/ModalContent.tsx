import * as React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import {
  RiCloseFill,
  RiEdit2Fill,
  RiDeleteBinLine,
  RiPlayListAddFill,
} from 'react-icons/ri';
import { Button } from '../Button';
import { Text } from '../Text';

import { getCurrentHour } from '../../utils/time';

import { ButtonLogo } from '../ButtonLogo';
import styles from './modalContent.module.css';

export interface Todo {
  id: string;
  time: Date;
  text: string;
  done: boolean;
}

interface ModalContentProps {
  text: string;
  changeText: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  addTodo: () => void;
  modalTodos: Todo[];
  isEditing: boolean | string;
  saveChanges: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  closeModal: () => void;
  close: () =>void;
  deleteTodo: (data:Todo) => void;
  endEditing: () => void;
  startEditing: (data:string) => void;
  modalWindow: React.RefObject<HTMLDivElement>;
}

export const ModalContent = (props: ModalContentProps) => {
  const {
    text,
    changeText,
    addTodo,
    modalTodos,
    isEditing,
    saveChanges,
    closeModal,
    close,
    deleteTodo,
    endEditing,
    startEditing,
    modalWindow,
  } = props;

  return (
    <div className={styles['modal-container']} ref={modalWindow}>
      <ButtonLogo onClick={close} variant="close-modal" className={styles.close}>
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
        <Button onClick={closeModal} variant="save" className={styles.save}>
          Save
        </Button>
      </div>
    </div>
  );
};
