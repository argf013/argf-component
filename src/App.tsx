import React from 'react';
import Button from './components/Button';
import useToast from './components/Toast/useToast';
import { AlertFillIcon, CheckCircleFillIcon } from '@primer/octicons-react';

function App() {
  const { addToast } = useToast();

  const handleSuccess = () => {
    addToast({ severity: 'success', message: 'Yeah' });
  };

  const handleError = () => {
    addToast({ severity: 'error', message: 'Yes' });
  };

  const handleWarning = () => {
    addToast({ severity: 'warning' });
  };

  return (
    <>
      <div className='flex flex-col gap-2 justify-center my-5'>
        <h1 className='justify-center flex'>Rounded Button</h1>
        <div className='flex flex-row justify-center'>
          <Button
            label='Success'
            icon={<CheckCircleFillIcon />}
            rounded
            severity='primary'
            onClick={handleSuccess}
          />
          <Button
            label='Error'
            severity='danger'
            rounded
            onClick={handleError}
          />
          <Button
            label='Warning'
            icon={<AlertFillIcon />}
            rounded
            severity='warning'
            onClick={handleWarning}
          />
          <Button label='Waduh' rounded severity='secondary' />
        </div>
      </div>
    </>
  );
}

export default App;
