import { useField } from 'formik';
import { ReactNode, useId, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import tw, { TwStyle, styled } from 'twin.macro';

type Width = 'auto' | 'full';

const widthStyles: Record<Width, TwStyle> = {
  auto: tw`w-auto`,
  full: tw`w-full`,
};

const InputStyled = styled.input<{
  hasIcon?: boolean;
  width: Width;
  disabled: boolean;
}>`
  ${tw`relative block appearance-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-secondary-500 focus:outline-none focus:ring-secondary-500 sm:text-sm`}
  ${({ hasIcon }) => hasIcon && tw`pl-6`}
  ${({ width }) => widthStyles[width]}
  ${({ disabled }) => disabled && tw`text-neutral-500`}
`;

interface Props extends React.ComponentProps<'input'> {
  name: string;
  label?: string;
  placeholder: string;
  icon?: ReactNode;
  width?: Width;
}

const Input = ({
  name,
  label,
  placeholder,
  icon,
  width = 'full',
  type = 'text',
  ...rest
}: Props) => {
  const id = useId();
  const [field, meta] = useField(name);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const inputProps = {
    id,
    name,
    placeholder,
  };

  const hasIcon = !!icon;

  return (
    <div>
      {label && (
        <label className='block mb-1 text-16 font-semibold' htmlFor={id}>
          {label}
        </label>
      )}
      <div className='relative'>
        {hasIcon && (
          <i className='absolute left-1 top-1/2 -translate-y-1/2 text-gray-20'>
            {icon}
          </i>
        )}

        <InputStyled
          hasIcon={hasIcon}
          width={width}
          {...inputProps}
          {...field}
          {...(rest as any)}
          type={type === 'password' && !visiblePassword ? 'password' : 'text'}
        />

        {type === 'password' && (
          <button
            className='text-20 text-text-secondary absolute right-1 top-1/2 -translate-y-1/2'
            type='button'
            onClick={() => setVisiblePassword(!visiblePassword)}
          >
            {visiblePassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        )}
      </div>
      {meta.touched && meta.error && (
        <p className='my-0.4 text-text-error text-12'>{meta.error}</p>
      )}
    </div>
  );
};

export default Input;
