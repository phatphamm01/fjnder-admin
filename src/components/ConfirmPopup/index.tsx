import styled from '@emotion/styled';
import { FC, Fragment } from 'react';
import tw from 'twin.macro';
import { Popup } from '~/components/Popup';

const ConfirmPopupContainer = styled.div`
  ${tw``}
`;

interface IConfirmPopup {
  acceptTitle?: string;
  cancelTitle?: string;
  title: string;
  description: string;
  ButtonComponent: FC<React.ComponentProps<'div'>>;
  onAccept?: () => void;
  onCancel?: () => void;
}

export const ConfirmPopup: FC<IConfirmPopup> = ({
  title,
  description,
  acceptTitle = 'Accept',
  cancelTitle = 'Cancel',
  ButtonComponent,
  onAccept = () => {},
  onCancel = () => {},
}) => {
  return (
    <Popup title={title} ButtonComponent={ButtonComponent}>
      {({ setIsOpen }) => {
        const handleAccept = () => {
          onAccept();
          setIsOpen(false);
        };

        const handleCancel = () => {
          onCancel();
          setIsOpen(false);
        };

        return (
          <Fragment>
            <div className='mt-2'>
              <p className='text-sm text-gray-500'>{description}</p>
            </div>
            <div className='mt-4 flex justify-between gap-8'>
              <button
                className=' group-hover:text-neutral-400 group w-full justify-center rounded-md border border-transparent bg-neutral-600 py-2 px-4 text-sm font-medium text-white hover:bg-neutral-700 disabled:cursor-progress disabled:bg-neutral-600 disabled:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2'
                onClick={handleCancel}
              >
                {cancelTitle}
              </button>
              <button
                className='group-hover:text-primary-400 group w-full justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white hover:bg-primary-700 disabled:cursor-progress disabled:bg-neutral-600 disabled:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
                onClick={handleAccept}
              >
                {acceptTitle}
              </button>
            </div>
          </Fragment>
        );
      }}
    </Popup>
  );
};
