import { useEffect } from "react";

export function useCloseWithEsc(shouldAddListener, onClose) {
  useEffect(() => {
    if (shouldAddListener) document.addEventListener('keydown', handleEscClose);
    return () => document.removeEventListener('keydown', handleEscClose);
  }, [shouldAddListener]);

  function handleEscClose(evt) {
    if (evt.key === "Escape") {
      onClose(evt);
    }
  }
} 