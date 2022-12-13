import { keyframes } from "@emotion/react";
import React from "react";

import { css, styled, theme } from "twin.macro";

export interface SpinProps {
  className?: string;
  color?: string;
  height?: number | string;
  style?: React.CSSProperties;
  duration?: string;
}

const LoadingIcon: React.FC<SpinProps & React.HTMLProps<HTMLDivElement>> = ({
  className = "",
  color = theme("colors.primary-500"),
  height = "2rem",
  style = {},
  duration = "1.2s",
  ...others
}) => {
  const resolvedHeight = typeof height === "number" ? `${height}px` : height;

  return (
    <LoadingStyled
      color={color}
      resolvedHeight={resolvedHeight}
      style={style}
      className={css`` + ` ${className}`}
      {...(others as any)}
    ></LoadingStyled>
  );
};

export default LoadingIcon;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;
const LoadingStyled = styled.div<any>`
  border: ${({ color }) => `3px solid ${color}33`};
  border-top-color: ${({ color }) => color};
  border-radius: 50%;
  height: ${({ resolvedHeight }) => resolvedHeight};
  animation: ${spin} 1s linear infinite;
  aspect-ratio: 1/1;
`;
