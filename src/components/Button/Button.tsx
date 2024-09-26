import React from 'react';
import clsx from 'clsx';

type Severity = 'primary' | 'secondary' | 'danger' | 'warning' | 'success';

interface ButtonProps {
  /**
   *  Set the button severity
   */
  severity?: Severity;

  /* Button label */
  label: string;

  /**
   * Callback function when button is clicked
   */
  onClick?: () => void;

  /**
   * Set button radius. When `true`, the button will be rounded.
   * @type {boolean}
   * @default true
   */
  rounded?: boolean;

  /**
   * Button icon
   * @type {React.ReactNode}
   * e.g. <InfoIcon />
   */
  icon?: React.ReactNode;

  /**
   * Additional styles for the button
   */
  style?: React.CSSProperties;

  /**
   * Additional class names for the button
   */
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  severity,
  label,
  onClick,
  rounded,
  icon,
  style,
  className,
}) => {
  const getButtonClass = (severity: string) => {
    const baseClass =
      'text-white font-medium text-[14px] px-5 py-2.5 inline-block';
    const roundedClass = rounded ? 'rounded-full' : 'rounded-md';
    switch (severity) {
      case 'primary':
        return `${baseClass} ${roundedClass} bg-primary hover:bg-primary-hover`;
      case 'secondary':
        return `${baseClass} ${roundedClass} bg-secondary hover:bg-secondary-hover`;
      case 'danger':
        return `${baseClass} ${roundedClass} bg-danger hover:bg-danger-hover`;
      case 'warning':
        return `${baseClass} ${roundedClass} bg-warning hover:bg-warning-hover`;
      case 'success':
        return `${baseClass} ${roundedClass} bg-success hover:bg-success-hover`;
      default:
        return baseClass;
    }
  };

  return (
    <button
      className={clsx(
        getButtonClass(severity as Severity),
        'flex flex-row items-center',
        className,
      )}
      onClick={onClick}
      style={style}
    >
      {icon && <span className='mr-2'>{icon}</span>}
      <span>{label}</span>
    </button>
  );
};

export default Button;
