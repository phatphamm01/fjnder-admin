import styled from '@emotion/styled';
import { FC } from 'react';
import tw from 'twin.macro';

const AvatarContainer = styled.img`
  ${tw`inline-block h-10 w-10 rounded-full`}
`;

interface IAvatar {
  image?: string;
}

export const Avatar: FC<IAvatar> = ({ image }) => {
  return <AvatarContainer src={image} alt='' />;
};
