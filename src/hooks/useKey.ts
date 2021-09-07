import * as React from 'react';

export const usePressOnKey = (
  key: string,
  handler: () => void,
) => {
  React.useEffect(() => {
    const actionOnKey = (event: KeyboardEvent) => {
      if (key === event.key) {
        handler();
      }
    };

    document.addEventListener('keydown', actionOnKey);

    return () => {
      document.removeEventListener('keydown', actionOnKey);
    };
  }, [handler, key]);
};
