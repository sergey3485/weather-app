import * as React from 'react';

import { useClickOutside } from '../../hooks/useClickOutside';
import { usePressOnKey } from '../../hooks/useKey';

import styles from './modal.module.css';

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal = (props: ModalProps) => {
  const { open, children, onClose } = props;
  const modalWindow = React.useRef<HTMLDivElement>(null);

  useClickOutside(modalWindow, onClose);
  usePressOnKey('Escape', onClose);

  if (!open) {
    return (null);
  }

  return (
    <div className={styles['modal-content']}>
      <div
        className={styles.shadow}
      />
      <div className={styles.modal} ref={modalWindow}>
        {children}
      </div>
    </div>
  );
};
