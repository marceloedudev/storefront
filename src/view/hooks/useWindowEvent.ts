import { useEffect, useRef } from 'react';

const useWindowEvent = (eventName, handler) => {
  const handlerRef: any = useRef<typeof handler>();

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener: typeof handler = (event) => handlerRef.current(event);
    window.addEventListener(eventName, eventListener);

    return () => {
      window.removeEventListener(eventName, eventListener);
    };
  }, [eventName]);
};

export default useWindowEvent;
