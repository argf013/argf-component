import {
  AlertFillIcon,
  CheckCircleFillIcon,
  XCircleFillIcon,
  XIcon,
} from '@primer/octicons-react';
import React, { useEffect, useState } from 'react';

export type Severity = 'error' | 'success' | 'warning';

export interface ToastProps {
  message?: string;
  severity: Severity;
  life?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  severity,
  life = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsClosing(true);
      setTimeout(onClose, 300);
    }, life);
    return () => clearTimeout(timer);
  }, [life, onClose]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  const severityClasses = {
    error: 'bg-danger text-white',
    success: 'bg-success text-white',
    warning: 'bg-warning text-white',
  };

  const severityIcons = {
    error: <XCircleFillIcon />,
    success: <CheckCircleFillIcon />,
    warning: <AlertFillIcon />,
  };

  return (
    <div
      className={`relative px-3 py-2 flex flex-row items-center gap-2 rounded-lg w-[20em] text-[14px] shadow-md transform transition-all duration-300 ease-in-out 
        ${isVisible && !isClosing ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}
        ${severityClasses[severity]}`}
    >
      <span>{severityIcons[severity]}</span>
      <span>{message}</span>
      <span
        className='absolute top-50 right-2 cursor-pointer'
        onClick={handleClose}
      >
        <XIcon />
      </span>
    </div>
  );
};

export default Toast;
