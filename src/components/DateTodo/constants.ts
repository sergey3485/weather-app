import * as uuid from 'uuid';

import { Todo } from '../TodoModal';

export const initialTodo: Todo[] = [
  {
    id: uuid.v4(),
    time: new Date(),
    text: 'Visit a doctor',
    done: false,
  },
  {
    id: uuid.v4(),
    time: new Date(),
    text: 'have diner',
    done: false,
  },
  {
    id: uuid.v4(),
    time: new Date(),
    text: 'watch TV',
    done: false,
  },
  {
    id: uuid.v4(),
    time: new Date(),
    text: 'prepare house to visiting friends',
    done: false,
  },
  {
    id: uuid.v4(),
    time: new Date(),
    text: 'going to work',
    done: false,
  },
];
