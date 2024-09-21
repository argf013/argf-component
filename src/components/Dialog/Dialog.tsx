import { XIcon } from '@primer/octicons-react';
import React, { useState, useEffect } from 'react';

interface DialogProps {
  /**
   *  Dialog header text
   * */
  header: string;
  
  /**
   * Slot for dialog content
   * you can pass any JSX element as children
   * e.g. <p>Dialog content</p>
   */
  children: React.ReactNode;
  
  /**
   * Controls whether the dialog is visible or not
   * @type {boolean}
   */
  visible: boolean;
  
  /**
   * Dialog size
   * @type {'small' | 'medium' | 'large'}
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Dialog icon
   * @type {React.ReactNode}
   * e.g. <InfoIcon />
   */
  icon?: React.ReactNode;
  
  /**
   * Dialog severity
   * @type {'info' | 'danger' | 'warning'}
   * @default 'info'
   * e.g. 'info' | 'danger' | 'warning'
   */
  severity?: 'info' | 'danger' | 'warning';
  
  /**
   * Controls whether the dialog is closeable. When `true`, the X icon will be visible.
   * @type {boolean}
   * @default true
   */
  closeable?: boolean;
  /**
   * Callback function to close the dialog.
   * @type {function}
   */
  onClose: () => void;
}

const Dialog: React.FC<DialogProps> = ({
  header,
  children,
  visible,
  onClose,
  size = 'medium',
  icon,
  severity = 'primary',
  closeable = true,
}) => {
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
      setTimeout(() => setShow(false), 300);
    }
  }, [visible]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeable) {
        onClose();
      }
    };

    if (visible) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [visible, closeable, onClose]);

  const sizeClasses = {
    small: 'w-1/4 min-w-[15em]',
    medium: 'w-1/3 min-w-[20em]',
    large: 'w-1/2 min-w-[30em]',
  };

  const severityClasses = {
    info: 'text-blue-500',
    danger: 'text-red-500',
    warning: 'text-yellow-500',
  };

  return (
    <>
      {show && (
        <div
          className={`fixed inset-0 flex items-center justify-center backdrop-blur transition-opacity duration-300 ease-in-out ${animate ? 'opacity-100' : 'opacity-0'}`}
        >
          <div
            className={`bg-white px-5 py-4 rounded-lg shadow-lg ${sizeClasses[size]} transform transition-transform duration-300 ease-in-out ${animate ? 'scale-100' : 'scale-95'}`}
          >
            <div
              className={` rounded-t-lg flex justify-between items-center ${severityClasses[severity as 'info' | 'danger' | 'warning']}`}
            >
              <div className='flex items-center'>
                {icon && <div className='mr-2 flex items-center'>{icon}</div>}
                <h2 className='text-lg font-semibold flex items-center'>
                  {header}
                </h2>
              </div>
              {closeable && (
                <button
                  onClick={onClose}
                  className='text-dark flex items-center'
                >
                  <XIcon />
                </button>
              )}
            </div>
            <div className='text-left py-2'>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dialog;
