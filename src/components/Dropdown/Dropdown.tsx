import { ChevronDownIcon } from '@primer/octicons-react';
import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import clsx from 'clsx';

interface Option {
  /**
   * Label to be displayed in the dropdown
   */
  label: string;

  /**
   * Value to be passed when the option is selected
   */
  value: string;
}

interface DropdownProps {
  /**
   * Options to be displayed in the dropdown
   * e.g. 
   * [
   *  {
   *    label: 'Option 1',
   *    value: 'option1'
   *  },
   *  {  
   *    label: 'Option 2',
   *    value: 'option2'
   *  }
   * ]
   */
  options: Option[];

  /**
   * Callback function to be called when an option is selected
   * e.g. (option) => alert(option.label)
   */
  onSelect: (option: Option) => void;

  /**
   * Placeholder text to be displayed when no option is selected
   * @default 'Select an option'
   */
  placeholder?: string;

  /**
   * Size of the dropdown
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;

  /**
   * Initial value to be displayed in the dropdown
   */
  initialValue?: Option;

  /**
   * Custom styles to be applied to the dropdown
   * e.g. { width: '200px', height: '300px' }
   */
  style?: CSSProperties;

  /**
   * Custom class name to be applied to the dropdown
   * e.g. 'text-red-500'
   */
  className?: string;

  /**
   * Custom class name to be applied to the option label
   * e.g. 'text-red-500'
   */
  labelClassName?: string;

  /**
   * Whether the dropdown should be searchable
   * @default false
   */
  isSearchable?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  placeholder = 'Select an option',
  size = 'medium',
  disabled = false,
  initialValue = null,
  style,
  className,
  labelClassName,
  isSearchable = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    initialValue,
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [maxHeight, setMaxHeight] = useState('0px');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialValue) {
      setSelectedOption(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setMaxHeight('0px');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      const newMaxHeight = isOpen
        ? '0px'
        : `${Math.min(options.length * 180)}px`;
      setMaxHeight(newMaxHeight);
    }
  };

  const handleSelect = (option: Option) => {
    if (!disabled) {
      setSelectedOption(option);
      onSelect(option);
      setIsOpen(false);
      setSearchTerm('');
      setMaxHeight('0px');
    }
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sizeClass =
    size === 'small' ? 'w-32' : size === 'large' ? 'w-64' : 'w-48';

  return (
    <div
      ref={dropdownRef}
      className={clsx('relative inline-block text-left', sizeClass, className)}
      style={style}
    >
      <button
        onClick={handleToggle}
        className={clsx(
          'inline-flex items-center gap-2 justify-left',
          sizeClass,
          'rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50',
          { 'cursor-not-allowed opacity-50': disabled },
        )}
        disabled={disabled}
      >
        <span
          className={clsx({ 'text-gray-400': !selectedOption }, labelClassName)}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDownIcon className='ml-auto' />
      </button>
      <div
        className={clsx(
          'absolute z-50 mt-2 transition-all duration-300 ease-in-out',
          sizeClass,
          'rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5',
          {
            'opacity-0': !isOpen,
            'opacity-100': isOpen,
            invisible: !isOpen,
            visible: isOpen,
          },
        )}
        style={{
          maxHeight: maxHeight,
          transition:
            'max-height 0.3s ease, opacity 0.3s ease, visibility 0.3s ease',
        }}
      >
        {isSearchable && (
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full px-4 font-medium py-2 text-sm rounded-t-md border-b border-gray-300 focus:outline-none'
            placeholder='Search...'
          />
        )}
        <ul className='max-h-60 overflow-auto px-2 py-2'>
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className='cursor-pointer select-none py-2 px-3 font-medium text-sm relative rounded-md hover:bg-gray-100 hover:text-dark'
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
