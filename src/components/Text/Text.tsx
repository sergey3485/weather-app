import * as React from 'react';

import styles from './text.module.css';

export interface TextProprs {
  children: React.ReactNode;
  variant: string;
}

export const Text = (props: TextProprs) => {
  const { children, variant } = props;
  return (
    <span className={`${styles.text} ${styles[variant]}`}>
      {children}
    </span>
  );
};
