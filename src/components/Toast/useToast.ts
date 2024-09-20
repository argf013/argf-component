import { useContext } from 'react';
import { ToastContext, ToastContextProps } from './ToastProvider';

/**
 * Custom hook to use the Toast context.
 * This hook provides access to the addToast and removeToast functions.
 * 
 * @returns {ToastContextProps} The context value containing addToast and removeToast functions.
 * @throws Will throw an error if used outside of a ToastProvider.
 */
const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default useToast;