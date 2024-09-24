import { Tooltip } from 'react-tooltip';
import React, { useEffect, useCallback } from 'react';
import Dialog from '../Dialog/Dialog';
import { InfoIcon, AlertFillIcon } from '@primer/octicons-react';

interface DialogConfirmProps {
  /**
   *  Set the dialog header text
   *  e.g. 'Delete item'
   */
  header: string;

  /**
   *  Set the dialog message
   *  e.g. 'Are you sure you want to delete this item?'
   */
  message: string;

  /**
   *  Set the dialog items
   *  you can pass items as an array of strings
   *  e.g. ['item1', 'item2']
   */
  items?: string[];

  /**
   *  Set the dialog severity
   *  @default 'info'
   */
  severity?: 'info' | 'warning' | 'danger';

  /**
   *  Callback function to cancel the dialog
   *  e.g. () => setOpen(false)
   */
  onCancel: () => void;

  /**
   *  Callback function to submit the dialog
   *  e.g. () => setOpen(false)
   */
  onSubmit: () => void;

  /**
   *  Set the dialog submit label
   *  @default 'Submit'
   *  e.g. submitLabel='Delete'
   */
  submitLabel?: string;

  /**
   *  Set the dialog cancel label
   *  @default 'Cancel'
   *  e.g. cancelLabel='Cancel'
   */
  cancelLabel?: string;

  /**
   *  Controls whether the dialog is visible or not
   *  @default false
   *  e.g. visible={true}
   */
  visible: boolean;

  /**
   *  Controls whether the dialog header icon is visible or not
   *  @default true
   *  e.g. headerIcon={false}
   */
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

  const getButtonClass = useCallback(
    (severity: 'info' | 'warning' | 'danger') => {
      switch (severity) {
        case 'warning':
          return 'bg-warning hover:bg-warning-hover text-white hover:text-gray-100';
        case 'danger':
          return 'bg-danger hover:bg-danger-hover text-white hover:text-gray-100';
        default:
          return 'bg-primary hover:bg-primary-hover text-white hover:text-gray-100';
      }
    },
    [],
  );

  const getIcon = useCallback(
    (severity: 'info' | 'warning' | 'danger') => {
      if (!headerIcon) return null;
      switch (severity) {
        case 'warning':
        case 'danger':
          return <AlertFillIcon />;
        default:
          return <InfoIcon />;
      }
    },
    [headerIcon],
  );

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
        <ul className='list-disc px-2 py-2'>
          {items?.map((item, index) => (
            <li key={index} className='truncate ... max-w-xs'>
              <span>&#8226; </span>
              <span
                data-tooltip-id={`tooltip-${index}`}
                data-tooltip-content={item}
              >
                {item}
              </span>
              <Tooltip id={`tooltip-${index}`} place='top' />
            </li>
          ))}
        </ul>
        <div className='flex justify-end gap-2 mt-4'>
          <button
            onClick={onCancel}
            className='hover:bg-gray-200 py-2 px-5  rounded-full'
          >
            {cancelLabel}
          </button>
          <button
            onClick={onSubmit}
            className={`${getButtonClass(severity)} py-2 px-5 rounded-full`}
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogConfirm;
