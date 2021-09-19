import * as React from 'react';

import styles from './buttonLogo.module.css';

export interface ButtonLogoProps {
  variant: string,
  children?: React.ReactNode,
  handler?: () => void,
}

export const ButtonLogo = (props: ButtonLogoProps) => {
  const { children, variant, handler } = props;

  return (
    <button type="button" className={`${styles.button} ${styles[variant]}`} onClick={handler}>
      {children}
    </button>
  );
};
