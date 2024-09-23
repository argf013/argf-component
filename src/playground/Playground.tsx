import React from 'react';
import Dropdown from '../components/Dropdown/Dropdown';

const Playground = () => {
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
    </div>
  );
};

export default Playground;
