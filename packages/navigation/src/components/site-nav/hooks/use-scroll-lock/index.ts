import { useLayoutEffect, useRef } from 'react';

function useScrollLock(shouldLockScroll: boolean) {
  const previousBodyOverflow = useRef<string>(document.body.style.overflow);

  useLayoutEffect(() => {
    const bodyStyle = document.body.style;

    if (shouldLockScroll) {
      previousBodyOverflow.current = bodyStyle.overflow;
      bodyStyle.overflow = 'hidden';

      return () => {
        bodyStyle.overflow = previousBodyOverflow.current;
      };
    }

    bodyStyle.overflow = previousBodyOverflow.current ?? 'unset';
  }, [shouldLockScroll]);
}

export default useScrollLock;
