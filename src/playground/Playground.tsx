import React, { useState } from 'react';
import { Accordion, AccordionItem } from '../components/Accordion/Accordion';
import Menu, { MenuItem } from '../components/Menu/Menu';
import { MailIcon, PersonIcon, TrashIcon } from '@primer/octicons-react';
import Dialog from '../components/Dialog/Dialog';
import DialogConfirm from '../components/DialogConfirm/DialogConfirm';
import useToast from '../components/Toast/useToast';

const Playground = () => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogConfirmVisible, setDialogConfirmVisible] = useState(false);
  const { addToast } = useToast();
  const items: AccordionItem[] = [
    {
      title: 'What is Lorem Ipsum?',
      content: (
        <>
          <p className='mb-2 text-gray-500'>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s.
          </p>
        </>
      ),
    },
    {
      title: 'Why do we use it?',
      content: (
        <>
          <p className='mb-2 text-gray-500 dark:text-gray-400'>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters.
          </p>
        </>
      ),
    },
    {
      title: 'Where can I get some?',
      content: (
        <>
          <p className='mb-2 text-gray-500 dark:text-gray-400'>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don&apos;t look even slightly
            believable.
          </p>
        </>
      ),
    },
  ];

  const menuItems: MenuItem[] = [
    {
      label: 'Show Dialog',
      icon: <TrashIcon />,
      onClick: () => setDialogVisible(true),
    },
    {
      label: 'Show Confirm Dialog',
      icon: <PersonIcon />,
      onClick: () => setDialogConfirmVisible(true),
    },
    {
      label: 'Logout',
      icon: <MailIcon />,
      danger: true,
      onClick: () => {
        addToast({
          message: 'Logged out successfully',
          severity: 'success',
        });
      },
    },
  ];

  return (
    <div className='max-w-2xl flex justify-center flex-col mx-auto'>
      <h1>Playground</h1>
      <Menu items={menuItems} className='my-4' />
      <Accordion items={items} multiple={true} animationDuration={300} />
      <Menu items={menuItems} className='my-4' vertical />

      <Dialog
        header='Dialog Header'
        visible={dialogVisible}
        onClose={() => setDialogVisible(false)}
        closeable
        size='medium'
        severity='info'
      >
        <p>Dialog content goes here</p>
      </Dialog>

      <DialogConfirm
        header='Confirm Dialog Header'
        visible={dialogConfirmVisible}
        severity='danger'
        message='Are you sure you want to delete this item?'
        items={['This action cannot be undone']}
        onCancel={() => setDialogConfirmVisible(false)}
        onSubmit={() => {
          alert('Confirmed');
          setDialogConfirmVisible(false);
        }}
      />
    </div>
  );
};

export default Playground;
