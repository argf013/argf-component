import { useContext } from 'react';
import { ToastContext, ToastContextProps } from './ToastProvider';

const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default useToast;
