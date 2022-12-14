import styled from '@emotion/styled';
import { Dialog, Transition } from '@headlessui/react';
import { FC, useState, Fragment } from 'react';
import tw from 'twin.macro';

const PopupContainer = styled.div`
  ${tw``}
`;

interface IPopup {
  title: string;
  ButtonComponent: FC<React.ComponentProps<'div'>>;
  children?: (props: {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
  }) => JSX.Element;
}

export const Popup: FC<IPopup> = ({ title, ButtonComponent, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <Fragment>
      <ButtonComponent onClick={() => setIsOpen(true)} />

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    {title}
                  </Dialog.Title>
                  <Dialog.Description>
                    {children?.({ isOpen, setIsOpen: onOpen })}
                  </Dialog.Description>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  );
};
