import * as React from 'react';

export const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  handler: () => void,
) => {
  React.useEffect(() => {
    const actionOnClick = (event: MouseEvent | TouchEvent) => {
      if (!ref.current?.contains(event.target as HTMLElement)) {
        handler();
      }
    };

    document.addEventListener('mousedown', actionOnClick);
    document.addEventListener('touchstart', actionOnClick);

    return () => {
      document.removeEventListener('mousedown', actionOnClick);
      document.removeEventListener('touchstart', actionOnClick);
    };
  }, [handler, ref]);
};
