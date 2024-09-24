import React, { useState } from 'react';

interface InputProps {
  /**
   * Type of the input field
   */
  type: string;

  /**
   * Placeholder text for the input field
   * @default ''
   */
  placeholder?: string;

  /**
   * Value of the input field
   */
  value: string;

  /**
   * Callback function that is called when the input value changes
   * @param event - The event object
   */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Size of the input field
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Label for the input field
   */
  label?: string;

  /**
   * Set the input field to disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Custom styles for the input field
   */
  style?: React.CSSProperties;

  /**
   * Custom class name for the input field
   */
  className?: string;

  /**
   * Set the input field to required
   * @default false
   */
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder = 'Type something...',
  value,
  onChange,
  size = 'medium',
  label,
  disabled = false,
  style,
  className,
  required = false,
}) => {
  const [isTouched, setIsTouched] = useState(false);

  let sizeClass = '';

  switch (size) {
    case 'small':
      sizeClass = 'px-2 py-1 text-sm max-w-[10em]';
      break;
    case 'medium':
      sizeClass = 'px-4 py-2 text-sm font-medium max-w-[15em]';
      break;
    case 'large':
      sizeClass = 'px-6 py-3 text-lg max-w-[20em]';
      break;
    default:
      sizeClass = 'px-4 py-2 text-base max-w-[15em]';
  }

  const handleBlur = () => {
    setIsTouched(true);
  };

  const borderClass =
    required && isTouched && !value ? 'border-danger' : 'border-gray-300';

  return (
    <div>
      {label && (
        <label htmlFor={label} className='block mb-[0.5px] text-sm'>
          {label}
        </label>
      )}
      <input
        id={label}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        disabled={disabled}
        style={style}
        className={`${sizeClass} border focus:outline-gray-700 ${borderClass} rounded-md ${className}`}
        required={required}
      />
    </div>
  );
};

export default Input;
