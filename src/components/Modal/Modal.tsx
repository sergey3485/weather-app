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

  return (
    <>
      <CSSTransition
        in={open}
        timeout={250}
        classNames={{
          enterActive: styles['animation-shadow-enter-active'],
          enter: styles['animation-shadow-enter'],
          exit: styles['animation-shadow-exit'],
          exitActive: styles['animation-shadow-exit-active'],
        }}
        mountOnEnter
        unmountOnExit
      >
        <div className={styles.shadow} />
      </CSSTransition>
      <CSSTransition
        in={open}
        timeout={250}
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
    </>
  );
};
