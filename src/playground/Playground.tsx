import React, { useState } from 'react';
import Dropdown from '../components/Dropdown/Dropdown';
import Input from '../components/Input/Input';
import { Accordion, AccordionItem } from '../components/Accordion/Accordion';
import Button from '../components/Button/Button';
import useToast from '../components/Toast/useToast';

const Playground = () => {
  const [inputValue, setInputValue] = useState('');
  const { addToast } = useToast();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const accordionItems: AccordionItem[] = [
    {
      title: 'Section 1',
      content: <p>This is the content of section 1.</p>,
    },
    {
      title: 'Section 2',
      content: <p>This is the content of section 2.</p>,
    },
  ];

  return (
    <div className='max-w-2xl flex justify-center flex-col mx-auto'>
      <h1>Playground</h1>
      <Dropdown
        placeholder='Select an A'
        options={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
        ]}
        onSelect={(option) => alert(option.label)}
        isSearchable
      />
      <Input
        type='text'
        value={inputValue}
        onChange={handleChange}
        placeholder='Enter your name'
        label='Name'
      />
      <Accordion
        items={accordionItems}
        defaultActiveIndex={0}
        multiple={true}
        animationDuration={300}
      />
      <Button
        label='Test Toast'
        severity='primary'
        onClick={() =>
          addToast({ severity: 'success', message: 'Hello, World!' })
        }
      />
    </div>
  );
};

export default Playground;
