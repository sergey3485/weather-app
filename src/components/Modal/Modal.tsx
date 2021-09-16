import * as React from 'react';
import { CSSTransition } from 'react-transition-group';

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

  // if (!open) {
  //   return (null);
  // }

  return (
    <div>
      {open && (
        <div className={styles.shadow} />
      )}
      <CSSTransition
        in={open}
        timeout={200}
        classNames={{
          enterActive: styles['animation-enter-active'],
          enter: styles['animation-enter'],
          exit: styles['animation-exit'],
          exitActive: styles['animation-exit-active'],
        }}
        mountOnEnter
        unmountOnExit
      >
        <div className={styles['modal-window']}>
          <div className={styles.modal} ref={modalWindow}>
            {children}
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};
