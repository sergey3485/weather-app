import * as React from 'react';

import { useClose } from '../../Hooks/useClose';

import styles from './modal.module.css';

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal = (props: ModalProps) => {
  const { open, children, onClose } = props;
  const modalWindow = React.useRef<HTMLDivElement>(null);

  // React.useEffect(() => {
  //   const closeModal = (event: MouseEvent | TouchEvent) => {
  //     if (!modalWindow.current?.contains(event.target as HTMLElement)) {
  //       onClose();
  //     }
  //   };
  //   document.addEventListener('mousedown', closeModal);
  //   document.addEventListener('touchstart', closeModal);

  //   return () => {
  //     document.removeEventListener('mousedown', closeModal);
  //     document.removeEventListener('touchstart', closeModal);
  //   };
  // }, [onClose]);

  useClose(modalWindow, onClose);

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
