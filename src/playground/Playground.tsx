import React from 'react';
import { Accordion, AccordionItem } from '../components/Accordion/Accordion';

const Playground = () => {
  const items: AccordionItem[] = [
    {
      title: 'What is Lorem Ipsum?',
      content: (
        <>
          <p className='mb-2 text-gray-500'>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy text
            ever since the 1500s.
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

  return (
    <div className='max-w-2xl flex justify-center flex-col mx-auto'>
      <h1>Playground</h1>
      <Accordion items={items} multiple={true} animationDuration={300} />
    </div>
  );
};

export default Playground;
