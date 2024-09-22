import { ChevronDownIcon } from '@primer/octicons-react';
import React, { useState } from 'react';

/**
 * Represents an item in the accordion.
 */
export interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

/**
 * Props for the Accordion component.
 */
interface AccordionProps {
  /**
   * Array of items to be displayed in the accordion.
   */
  items: AccordionItem[];

  /**
   * Index of the item that should be active by default.
   * If not provided, no item will be active initially.
   */
  defaultActiveIndex?: number;

  /**
   * If true, multiple items can be expanded at the same time.
   * If false, only one item can be expanded at a time.
   */
  multiple?: boolean;

  /**
   * Callback function that is called when an item is toggled.
   * Receives the index of the toggled item as an argument.
   */
  onToggle?: (index: number) => void;

  /**
   * Additional class name for the accordion container.
   */
  accordionClassName?: string;

  /**
   * Additional class name for each item in the accordion.
   */
  itemClassName?: string;

  /**
   * Additional class name for the heading of each item.
   */
  headingClassName?: string;

  /**
   * Additional class name for the content of each item.
   */
  contentClassName?: string;

  /**
   * Duration of the expand/collapse animation in milliseconds.
   */
  animationDuration?: number;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultActiveIndex = null,
  multiple = false,
  onToggle,
  accordionClassName = '',
  itemClassName = '',
  headingClassName = '',
  contentClassName = '',
  animationDuration = 500,
}) => {
  const [expanded, setExpanded] = useState<number[]>(
    defaultActiveIndex !== null ? [defaultActiveIndex] : [],
  );

  const toggleAccordion = (index: number) => {
    let newExpanded;
    if (multiple) {
      newExpanded = expanded.includes(index)
        ? expanded.filter((i) => i !== index)
        : [...expanded, index];
    } else {
      newExpanded = expanded.includes(index) ? [] : [index];
    }
    setExpanded(newExpanded);
    if (onToggle) onToggle(index);
  };

  return (
    <div
      id='accordion-collapse'
      data-accordion='collapse'
      className={accordionClassName}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={`${itemClassName} ${index === items.length - 1 ? 'border-b' : ''}`}
        >
          <h2 id={`accordion-collapse-heading-${index}`}>
            <button
              type='button'
              className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 ${
                index === 0 ? 'rounded-tl-xl rounded-tr-xl' : ''
              } hover:bg-gray-100 gap-3 ${headingClassName}`}
              onClick={() => toggleAccordion(index)}
              aria-expanded={expanded.includes(index)}
              aria-controls={`accordion-collapse-body-${index}`}
            >
              <span>{item.title}</span>
              <ChevronDownIcon
                size={24}
                className={`transform transition-transform duration-300 ${expanded.includes(index) ? 'rotate-180' : 'rotate-0'}`}
              />
            </button>
          </h2>
          <div
            id={`accordion-collapse-body-${index}`}
            className={`transition-max-height duration-${animationDuration} ease-in-out overflow-hidden ${expanded.includes(index) ? 'max-h-screen' : 'max-h-0'} ${contentClassName}`}
            aria-labelledby={`accordion-collapse-heading-${index}`}
          >
            <div className='p-5 border border-b-0 border-gray-200 '>
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
