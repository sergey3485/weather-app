import * as React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { RiMenu3Line } from 'react-icons/ri';

import { Button } from '../Button';
import { Text } from '../Text';
import { TodoModal, Todo } from '../TodoModal';
import { ButtonLogo } from '../ButtonLogo';

import { getCurrentHour, getCurrentDate } from '../../utils/time';
import { initialTodo } from './constants';

import styles from './dateTodo.module.css';

const getTodoStyles = (step: number) => ({
  transform: `translateY(-${step * 36}px)`,
  transition: '400ms',
});

export const DateTodo = (): JSX.Element => {
  const [date, setDate] = React.useState(new Date());
  const [todos, setTodos] = React.useState(initialTodo);
  const [isOpen, setIsOpen] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const [filtredTodos, setFiltredTodos] = React.useState<Todo[]>(todos);

  React.useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 10000);

    return () => clearInterval(timer);
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const onNext = () => {
    if (step >= filtredTodos.length) return;

    const changedTodos = todos.map((item) => {
      if (item.id === filtredTodos[step].id) {
        return {
          ...item,
          done: !item.done,
        };
      }
      return item;
    });

    setTodos(changedTodos);

    setStep((prevStep) => prevStep + 1);
  };

  const close = () => setIsOpen(false);

  const save = (newTodos: Todo[]) => {
    setTodos(newTodos);
    const filter = newTodos.filter((data) => data.done === false);
    setFiltredTodos(filter);
    setStep(0);
  };

  const isTodosEmpty = todos.length === 0;

  return (
    <div className={styles['container-date-todo']}>
      <TodoModal
        onClose={close}
        onSave={save}
        isOpen={isOpen}
        todos={todos}
      />
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
            <div className={styles['todo-list']} style={getTodoStyles(step)}>
              <TransitionGroup>
                {filtredTodos.map((data) => (
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
                ))}
              </TransitionGroup>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
