import React, { useState } from 'react';
import Button from './components/Button/Button';
import useToast from './components/Toast/useToast';
import Dialog from './components/Dialog/Dialog';
import {
  AlertFillIcon,
  CheckCircleFillIcon,
  InfoIcon,
  PlusCircleIcon,
  XCircleFillIcon,
} from '@primer/octicons-react';

function App() {
  const { addToast } = useToast();
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [isDangerDialogVisible, setDangerDialogVisible] = useState(false);
  const [isInfoDialogVisible, setInfoDialogVisible] = useState(false);

  const openDialog = () => setDialogVisible(true);
  const closeDialog = () => setDialogVisible(false);

  const openDangerDialog = () => setDangerDialogVisible(true);
  const closeDangerDialog = () => setDangerDialogVisible(false);

  const openInfoDialog = () => setInfoDialogVisible(true);
  const closeInfoDialog = () => setInfoDialogVisible(false);

  return (
    <>
      <div className='flex flex-col gap-2 justify-center my-5'>
        <h1 className='justify-center flex'>Rounded Button With Icon</h1>
        <div className='flex flex-row justify-center'>
          <Button
            label='Success'
            icon={<CheckCircleFillIcon />}
            rounded
            severity='primary'
            onClick={() => addToast({ severity: 'success', message: 'Yeah' })}
          />
          <Button
            label='Error'
            icon={<XCircleFillIcon />}
            severity='danger'
            rounded
            onClick={() => addToast({ severity: 'error', message: 'Yes' })}
          />
          <Button
            label='Warning'
            icon={<AlertFillIcon />}
            rounded
            severity='warning'
            onClick={() => addToast({ severity: 'warning' })}
          />
          <Button
            icon={<PlusCircleIcon />}
            label='Waduh'
            rounded
            severity='secondary'
          />
        </div>
        <h1 className='justify-center flex'>Normal Button</h1>
        <div className='flex flex-row justify-center'>
          <Button
            label='Success'
            severity='primary'
            onClick={() => addToast({ severity: 'success', message: 'Yeah' })}
          />
          <Button
            label='Error'
            severity='danger'
            onClick={() => addToast({ severity: 'error', message: 'Yes' })}
          />
          <Button
            label='Warning'
            severity='warning'
            onClick={() => addToast({ severity: 'warning' })}
          />
          <Button label='Waduh' severity='secondary' />
        </div>
        <h1 className='justify-center flex'>Dialog</h1>
        <div className='flex flex-row justify-center'>
          <Button label='Dialog' severity='primary' onClick={openDialog} />
          <Button
            label='Dialog Danger'
            severity='danger'
            onClick={openDangerDialog}
          />
          <Button
            label='Dialog Info'
            severity='primary'
            onClick={openInfoDialog}
          />
        </div>
      </div>
      <Dialog
        icon={<AlertFillIcon />}
        header='Dialog Header'
        visible={isDialogVisible}
        onClose={closeDialog}
      >
        <p>This is the dialog content.</p>
      </Dialog>
      <Dialog
        icon={<AlertFillIcon />}
        header='Dialog Danger'
        severity='danger'
        visible={isDangerDialogVisible}
        onClose={closeDangerDialog}
      >
        <p>This is the dialog content.</p>
      </Dialog>
      <Dialog
        icon={<InfoIcon />}
        header='Dialog Info'
        severity='info'
        visible={isInfoDialogVisible}
        onClose={closeInfoDialog}
      >
        <p>This is the dialog content.</p>
      </Dialog>
    </>
  );
}

export default App;
