import { KebabHorizontalIcon } from '@primer/octicons-react';
import React, { useState, useRef, useEffect } from 'react';

export interface MenuItem {
  /**
   * Menu item label
   */
  label: string;

  /**
   * Menu item icon
   */
  icon?: React.ReactNode;

  /**
   * Callback function when menu item is clicked
   */
  onClick?: () => void;

  /**
   * Disable menu item
   * @default false
   */
  disabled?: boolean;

  /**
   * Set menu item as danger
   * @default false
   */
  danger?: boolean;
}

export interface MenuProps {
  /**
   * Menu items
   */
  items: MenuItem[];

  /**
   * Additional class name
   */
  className?: string;

  /**
   * Additional style
   */
  style?: React.CSSProperties;

  /**
   * Additional class name for menu items
   */
  itemClassName?: string;

  /**
   * Additional style for menu items
   */
  itemStyle?: React.CSSProperties;

  /**
   * Menu size
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Set menu as vertical
   * @default false
   */
  vertical?: boolean;
}

const Menu: React.FC<MenuProps> = ({
  items,
  className,
  style,
  itemClassName,
  itemStyle,
  size = 'medium',
  vertical = false,
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (item: MenuItem) => {
    if (!item.disabled && item.onClick) {
      item.onClick();
      setOpenMenu(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpenMenu(false);
    }
  };

  const sizeClasses = {
    small: 'p-3 text-sm w-32',
    medium: 'p-4 text-sm w-52',
    large: 'p-5 text-lg w-64',
  };

  useEffect(() => {
    if (openMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenu]);

  return (
    <div ref={menuRef} className={`relative ${className}`} style={style}>
      <button
        className='menu-button px-1 bg-transparent text-dark rounded-full hover:bg-gray-300'
        onClick={() => setOpenMenu(!openMenu)}
      >
        <KebabHorizontalIcon className={vertical ? 'rotate-90' : ''} />
      </button>
      <div
        className={`transition-all transform duration-300 ease-in-out ${
          openMenu
            ? 'translate-y-0 opacity-100 scale-100'
            : '-translate-y-4 opacity-0 scale-95 pointer-events-none'
        } origin-top-left`}
      >
        <ul
          className={`menu-list absolute left-0 my-1 w-full flex gap-3 flex-col bg-white border border-gray-200 shadow-lg rounded ${sizeClasses[size]} ${itemClassName}`}
          style={itemStyle}
        >
          {items.map((item, index) => (
            <li
              key={index}
              className={`menu-item hover:underline ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} gap-2 flex items-center ${item.danger ? 'text-red-500' : ''}`}
              onClick={() => handleClick(item)}
            >
              {item.icon && (
                <span className={`${item.danger ? 'text-red-500' : ''}`}>
                  {item.icon}
                </span>
              )}
              <span className='flex flex-row'>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
