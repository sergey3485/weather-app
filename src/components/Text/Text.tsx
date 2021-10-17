import * as React from 'react';

import styles from './text.module.css';

export interface TextProprs extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode,
  variant: string,
  component?: React.ElementType,
}

export const Text = (props: TextProprs) => {
  const {
    children,
    variant,
    className = '',
    component,
    ...other
  } = props;

  const Component = component ?? 'span';
  return (
    <Component className={`${styles.text} ${styles[variant]} ${className}`} {...other}>
      {children}
    </Component>
  );
};
