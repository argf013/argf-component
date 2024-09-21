import React, { useEffect } from 'react';
import Dialog from '../Dialog/Dialog';
import { InfoIcon, AlertFillIcon } from '@primer/octicons-react';

interface DialogConfirmProps {
  header: string;
  message: string;
  items?: string[];
  severity?: 'info' | 'warning' | 'danger';
  onCancel: () => void;
  onSubmit: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  visible: boolean;
  headerIcon?: boolean;
}

const DialogConfirm: React.FC<DialogConfirmProps> = ({
  header,
  message,
  items,
  severity = 'info',
  onCancel,
  onSubmit,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  visible,
  headerIcon = true,
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    if (visible) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [visible, onCancel]);

  const getButtonClass = (severity: 'info' | 'warning' | 'danger') => {
    switch (severity) {
      case 'warning':
        return 'bg-yellow-500 text-white';
      case 'danger':
        return 'bg-red-500 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  const getIcon = (severity: 'info' | 'warning' | 'danger') => {
    if (!headerIcon) return null;
    switch (severity) {
      case 'warning':
      case 'danger':
        return <AlertFillIcon />;
      default:
        return <InfoIcon />;
    }
  };

  return (
    <Dialog
      icon={getIcon(severity)}
      header={header}
      visible={visible}
      onClose={onCancel}
      severity={severity}
      closeable={false}
    >
      <div>
        <span>{message}</span>
        <ul className='list-disc px-6'>
          {items?.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
        <div className='flex justify-end mt-4'>
          <button onClick={onCancel} className='mr-2'>
            {cancelLabel}
          </button>
          <button
            onClick={onSubmit}
            className={`${getButtonClass(severity)} py-2 px-4 rounded-full`}
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogConfirm;
