import * as React from 'react';

import styles from './button.module.css';

export interface ButtonProps {
  variant: string,
  children?: React.ReactNode,
  handler?: () => void,
}

export const Button = (props: ButtonProps) => {
  const { children, handler, variant } = props;

  return (
    <button className={`${styles.button} ${styles[variant]}`} type="button" onClick={handler}>
      {children}
    </button>
  );
};
