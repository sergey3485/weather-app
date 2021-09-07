import * as React from 'react';

export const useClose = (
  ref: React.RefObject<HTMLElement | null>,
  close: () => void,
) => {
  React.useEffect(() => {
    const closeModal = (event: MouseEvent | TouchEvent) => {
      if (!ref.current?.contains(event.target as HTMLElement)) {
        close();
      }
    };
    document.addEventListener('mousedown', closeModal);
    document.addEventListener('touchstart', closeModal);

    return () => {
      document.removeEventListener('mousedown', closeModal);
      document.removeEventListener('touchstart', closeModal);
    };
  }, [close, ref]);
};
