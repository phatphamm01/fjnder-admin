import styled from '@emotion/styled';
import { FC } from 'react';
import tw from 'twin.macro';
import LoadingIcon from '~/icons/LoadingIcon';

const EmptyComponentContainer = styled.div`
  ${tw``}
`;

interface IEmptyComponent {}

export const EmptyComponent: FC<IEmptyComponent> = () => {
  return (
    <div className='text-center h-[50vh] flex flex-col justify-center items-center'>
      <svg
        className='mx-auto h-12 w-12 text-gray-400'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        aria-hidden='true'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0112 12.75zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 01-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 002.248-2.354M12 12.75a2.25 2.25 0 01-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 00-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 01.4-2.253M12 8.25a2.25 2.25 0 00-2.248 2.146M12 8.25a2.25 2.25 0 012.248 2.146M8.683 5a6.032 6.032 0 01-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0115.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 00-.575-1.752M4.921 6a24.048 24.048 0 00-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 01-5.223 1.082'
        />
      </svg>

      <h3 className='mt-2 text-sm font-medium text-gray-900'>
        Not yet implemented
      </h3>
      <p className='mt-1 text-sm text-gray-500'>
        This feature has not been implemented yet
      </p>
    </div>
  );
};

export const NoDataComponent = () => (
  <button
    type='button'
    className='relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
  >
    <svg
      className='mx-auto h-12 w-12 text-gray-400'
      xmlns='http://www.w3.org/2000/svg'
      stroke='currentColor'
      fill='none'
      viewBox='0 0 48 48'
      aria-hidden='true'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6'
      />
    </svg>
    <span className='mt-2 block text-sm font-medium text-gray-900'>
      No data
    </span>
  </button>
);

export const LoadingComponent = () => (
  <div className='w-full flex items-center justify-center flex-col gap-2 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
    <LoadingIcon className='mr-2' height={48} />

    <span className='mt-2 block text-sm font-medium text-gray-900'>
      Loading
    </span>
  </div>
);
