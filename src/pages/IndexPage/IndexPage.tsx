import * as React from 'react';
import { useHistory } from 'react-router-dom';

import './indexPage.css';

export const IndexPage = (): JSX.Element => {
  // const { text, output, changeText } = usePost();
  const history = useHistory();
  const [text, setText] = React.useState('');

  const changeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.currentTarget.value;
    setText(newText);
  };

  const output = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    setText('');
    history.push(`/${text}`);
  };

  return (
    <div className="global-container">
      <form className="request-page-container" onSubmit={output}>
        <div className="header"> Weather-app</div>
        <input value={text} onChange={changeText} className="place-request" type="text" placeholder="City, Country" />
      </form>
    </div>
  );
};
