import * as React from 'react';

import styles from './button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: string;
  children?: React.ReactNode;
}

export const Button = (props: ButtonProps) => {
  const {
    children,
    variant,
    type,
    className = '',
    ...other
  } = props;

  return (
    <button className={`${styles.button} ${styles[variant]} ${className}`} type="button" {...other}>
      {children}
    </button>
  );
};
