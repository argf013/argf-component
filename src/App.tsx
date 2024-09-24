import React, { useState } from 'react';
import Button from './components/Button/Button';
import useToast from './components/Toast/useToast';
import Dialog from './components/Dialog/Dialog';
import DialogConfirm from './components/DialogConfirm/DialogConfirm';
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
  const [isWarningDialogVisible, setWarningDialogVisible] = useState(false);
  const [isConfirmWarningDialogVisible, setConfirmWarningDialogVisible] =
    useState(false);
  const [isConfirmDangerDialogVisible, setConfirmDangerDialogVisible] =
    useState(false);
  const [isConfirmInfoDialogVisible, setConfirmInfoDialogVisible] =
    useState(false);

  const openDialog = () => setDialogVisible(true);
  const closeDialog = () => setDialogVisible(false);

  const openDangerDialog = () => setDangerDialogVisible(true);
  const closeDangerDialog = () => setDangerDialogVisible(false);

  const openInfoDialog = () => setInfoDialogVisible(true);
  const closeInfoDialog = () => setInfoDialogVisible(false);

  const openWarningDialog = () => setWarningDialogVisible(true);
  const closeWarningDialog = () => setWarningDialogVisible(false);

  const openConfirmWarningDialog = () => setConfirmWarningDialogVisible(true);
  const closeConfirmWarningDialog = () => setConfirmWarningDialogVisible(false);

  const openConfirmDangerDialog = () => setConfirmDangerDialogVisible(true);
  const closeConfirmDangerDialog = () => setConfirmDangerDialogVisible(false);

  const openConfirmInfoDialog = () => setConfirmInfoDialogVisible(true);
  const closeConfirmInfoDialog = () => setConfirmInfoDialogVisible(false);

  const handleConfirmWarningSubmit = () => {
    closeConfirmWarningDialog();
  };

  const handleConfirmDangerSubmit = () => {
    closeConfirmDangerDialog();
  };

  const handleConfirmInfoSubmit = () => {
    closeConfirmInfoDialog();
  };

  return (
    <div className='max-w-4xl mx-auto py-10'>
      <h1 className='text-center text-3xl font-bold mb-8'>
        Documentation Page
      </h1>

      {/* Section Rounded Button With Icon */}
      <section className='mb-10'>
        <h2 className='text-center text-2xl font-semibold mb-6'>
          Rounded Button With Icon
        </h2>
        <div className='flex justify-center gap-4'>
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
      </section>

      {/* Section Normal Button */}
      <section className='mb-10'>
        <h2 className='text-center text-2xl font-semibold mb-6'>
          Normal Button
        </h2>
        <div className='flex justify-center gap-4'>
          <Button
            label='Success'
            severity='primary'
            onClick={() => addToast({ severity: 'success', message: 'Yeah' })}
          />
          <Button
            label='Success'
            severity='success'
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
      </section>

      {/* Section Dialog */}
      <section className='mb-10'>
        <h2 className='text-center text-2xl font-semibold mb-6'>Dialog</h2>
        <div className='flex justify-center gap-4'>
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
          <Button
            label='Dialog Warning'
            severity='warning'
            onClick={openWarningDialog}
          />
        </div>
      </section>

      {/* Section Dialog Confirm */}
      <section className='mb-10'>
        <h2 className='text-center text-2xl font-semibold mb-6'>
          Dialog Confirm
        </h2>
        <div className='flex justify-center gap-4'>
          <Button
            label='Dialog Confirm Warning'
            severity='warning'
            onClick={openConfirmWarningDialog}
          />
          <Button
            label='Dialog Confirm Danger'
            severity='danger'
            onClick={openConfirmDangerDialog}
          />
          <Button
            label='Dialog Confirm Info'
            severity='primary'
            onClick={openConfirmInfoDialog}
          />
        </div>
      </section>

      {/* Dialog Components */}
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
      <Dialog
        icon={<AlertFillIcon />}
        header='Dialog Warning'
        severity='warning'
        visible={isWarningDialogVisible}
        onClose={closeWarningDialog}
      >
        <p>This is the warning dialog content.</p>
      </Dialog>

      {/* Dialog Confirm Components */}
      <DialogConfirm
        headerIcon={false}
        header='Confirm Warning Action'
        message='Please confirm the warning action.'
        severity='warning'
        onCancel={closeConfirmWarningDialog}
        onSubmit={handleConfirmWarningSubmit}
        visible={isConfirmWarningDialogVisible}
      />
      <DialogConfirm
        header='Confirm Danger Action'
        message='Please confirm the danger action.'
        items={['Item 133333333333333333333333333333333333333', 'Item 2']}
        severity='danger'
        onCancel={closeConfirmDangerDialog}
        onSubmit={handleConfirmDangerSubmit}
        visible={isConfirmDangerDialogVisible}
      />
      <DialogConfirm
        header='Confirm Info Action'
        items={['Item 1', 'Item 2']}
        message='Please confirm the info action.'
        severity='info'
        onCancel={closeConfirmInfoDialog}
        onSubmit={handleConfirmInfoSubmit}
        visible={isConfirmInfoDialogVisible}
      />
    </div>
  );
}

export default App;
