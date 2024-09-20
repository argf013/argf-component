import React, { createContext, useState, ReactNode, useCallback } from 'react';
import Toast, { ToastProps } from './Toast';

export interface ToastContextProps {
  addToast: (toast: Omit<ToastProps, 'onClose'>) => void;
  removeToast: (id: number) => void;
}

export const ToastContext = createContext<ToastContextProps | undefined>(
  undefined,
);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Array<ToastProps & { id: number }>>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const addToast = (toast: Omit<ToastProps, 'onClose'>) => {
    const id = Date.now();
    setToasts((prevToasts) => [
      ...prevToasts,
      {
        ...toast,
        id,
        life: toast.life ?? 3000,
        onClose: () => removeToast(id),
      },
    ]);
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className='fixed bottom-0 right-0 p-4 space-y-2'>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
