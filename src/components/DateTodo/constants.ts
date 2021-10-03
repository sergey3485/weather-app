import * as uuid from 'uuid';

import { Todo } from '../TodoModal';

export const initialTodo: Todo[] = [
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
