import React from 'react';

/**
 * Button Component
 *
 * This is a reusable button component for React applications. It supports different severity levels,
 * optional icons, and rounded corners.
 *
 * @component
 * @example
 * // Example usage:
 * <Button
 *   severity="primary"
 *   label="Click Me"
 *   onClick={() => alert('Button clicked!')}
 *   rounded
 *   icon={<SomeIcon />}
 * />
 *
 * @param {Object} props - The properties object.
 * @param {'primary' | 'secondary' | 'danger' | 'warning'} [props.severity] - The severity level of the button.
 * This determines the button's color. Default is undefined.
 * @param {string} props.label - The text label of the button.
 * @param {function} [props.onClick] - The function to call when the button is clicked. Default is undefined.
 * @param {boolean} [props.rounded] - If true, the button will have fully rounded corners. Default is false.
 * @param {React.ReactNode} [props.icon] - An optional icon to display inside the button. Default is undefined.
 *
 * @returns {JSX.Element} The rendered button component.
 */

type Severity = 'primary' | 'secondary' | 'danger' | 'warning';

interface ButtonProps {
  severity?: Severity;
  label: string;
  onClick?: () => void;
  rounded?: boolean;
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
      'text-white font-medium text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none';
    const roundedClass = rounded ? 'rounded-full' : 'rounded-lg';
    switch (severity) {
      case 'primary':
        return `${baseClass} ${roundedClass} bg-blue-600 hover:bg-blue-700 `;
      case 'secondary':
        return `${baseClass} ${roundedClass} bg-gray-600 hover:bg-gray-700`;
      case 'danger':
        return `${baseClass} ${roundedClass} bg-red-600 hover:bg-red-700 `;
      case 'warning':
        return `${baseClass} ${roundedClass} bg-yellow-600 hover:bg-yellow-700`;
      default:
        return baseClass;
    }
  };

  return (
    <button className={getButtonClass(severity as Severity)} onClick={onClick}>
      {icon && <span className='mr-2'>{icon}</span>}
      {label}
    </button>
  );
};

export default Button;
