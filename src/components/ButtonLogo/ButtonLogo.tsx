import * as React from 'react';

import styles from './buttonLogo.module.css';

export interface ButtonLogoProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  variant: string,
  children?: React.ReactNode,
}

export const ButtonLogo = (props: ButtonLogoProps) => {
  const {
    children,
    variant,
    type,
    className = '',
    ...other
  } = props;

  return (
    <button type="button" className={`${styles.button} ${styles[variant]} ${className}`} {...other}>
      {children}
    </button>
  );
};
