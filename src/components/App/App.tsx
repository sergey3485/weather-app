import * as React from 'react';

import { RequestPage } from '../RequestPage/RequestPage';

export const App = (): JSX.Element => {
  const [text, setText] = React.useState('');

  const changeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.currentTarget.value;
    setText(newText);
  };

  const output = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(text);
    setText('');
  };

  return (
    <RequestPage text={text} onChangeText={changeText} onSubmitOutput={output} />
  );
};
