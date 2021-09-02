import * as React from 'react';
import { useHistory } from 'react-router-dom';

import styles from './indexPage.module.css';

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
    <div className={styles['global-container']}>
      <form className={styles['request-page-container']} onSubmit={onSubmit}>
        <div className={styles.header}>Weather</div>
        <input value={text} onChange={changeText} className={styles['place-request']} type="text" placeholder="City, Country" />
      </form>
    </div>
  );
};
