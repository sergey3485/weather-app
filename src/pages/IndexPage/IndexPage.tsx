import * as React from 'react';
import { useHistory } from 'react-router-dom';

import './indexPage.css';

export const IndexPage = (): JSX.Element => {
  const history = useHistory();
  const [text, setText] = React.useState('');

  const changeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.currentTarget.value;
    setText(newText);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setText('');
    history.push(`/${text}`);
  };

  return (
    <div className="global-container">
      <form className="request-page-container" onSubmit={onSubmit}>
        <div className="header">Weather</div>
        <input value={text} onChange={changeText} className="place-request" type="text" placeholder="City, Country" />
      </form>
    </div>
  );
};
