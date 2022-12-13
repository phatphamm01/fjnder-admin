import styled from '@emotion/styled';
import { FC } from 'react';
import tw from 'twin.macro';

const ContentLayoutContainer = styled.div`
  ${tw``}
`;

interface IContentLayout {
  children: React.ReactNode;
  title: React.ReactNode;
  leftRenderComponent?: JSX.Element;
  rightRenderComponent?: JSX.Element;
}

export const ContentLayout: FC<IContentLayout> = ({
  title,
  leftRenderComponent,
  rightRenderComponent,
  children,
}) => {
  return (
    <ContentLayoutContainer>
      <div className='mt-2'>
        <div className='min-w-0 flex-1'>
          <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
            {title}
          </h2>
        </div>
        <div className='mt-1 flex justify-between'>
          <div>{leftRenderComponent}</div>
          <div>{rightRenderComponent}</div>
        </div>
      </div>
      {children}
    </ContentLayoutContainer>
  );
};
