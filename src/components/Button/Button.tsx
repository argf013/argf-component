import React from 'react';

type Severity = 'primary' | 'secondary' | 'danger' | 'warning';

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
}

const Button: React.FC<ButtonProps> = ({
  severity,
  label,
  onClick,
  rounded,
  icon,
}) => {
  const getButtonClass = (severity: string) => {
    const baseClass =
      'text-white font-medium text-[13px] md:text-base lg:text-sm px-5 py-2.5';
    const roundedClass = rounded ? 'rounded-full' : 'rounded-md';
    switch (severity) {
      case 'primary':
        return `${baseClass} ${roundedClass} bg-[#009384] hover:bg-[#007d70] `;
      case 'secondary':
        return `${baseClass} ${roundedClass} bg-gray-600 hover:bg-gray-700`;
      case 'danger':
        return `${baseClass} ${roundedClass} bg-red-500 hover:bg-red-600 `;
      case 'warning':
        return `${baseClass} ${roundedClass} bg-yellow-600 hover:bg-yellow-700`;
      default:
        return baseClass;
    }
  };

  return (
    <button
      className={`${getButtonClass(severity as Severity)} flex flex-row items-center`}
      onClick={onClick}
    >
      {icon && <span className='mr-2'>{icon}</span>}
      {label}
    </button>
  );
};

export default Button;
