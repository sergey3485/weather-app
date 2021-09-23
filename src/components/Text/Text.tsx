import * as React from 'react';

import styles from './text.module.css';

export interface TextProprs extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode,
  variant: string,
}

export const Text = (props: TextProprs) => {
  const {
    children,
    variant,
    className = '',
    ...other
  } = props;
  return (
    <span className={`${styles.text} ${styles[variant]} ${className}`} {...other}>
      {children}
    </span>
  );
};
