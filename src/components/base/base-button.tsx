import { Button, ButtonProps } from '@mui/material';
import React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

interface Props extends ButtonProps {
  isLong?: boolean;
}

export const BaseButton: React.FunctionComponent<Props> = ({ isLong, ...rest }) => (
  <StyledButton isLong={isLong} {...rest} />
);

const StyledButton = styled(({ isLong, ...rest }) => <Button {...rest} />)<{
  isLong?: boolean;
}>`
  && {
    background: ${(props): FlattenSimpleInterpolation | null => css`
      linear-gradient(180deg,
        ${props.theme.palette.primaryGradientStart.main} 49.38%,
        ${props.theme.palette.primaryGradientFinish.main} 100%,
      ${props.theme.palette.primaryGradientFinish.main} 100%,
      ${props.theme.palette.primaryGradientFinish.main} 100%);
    `};
    mix-blend-mode: normal;
    box-shadow: 0 4px 4px rgba(90, 103, 214, 0.25);
    border-radius: 12px;
    min-width: 120px;
    ${(props) => {
      if (props.isLong) {
        return css`
          border: 2px solid #ffffff;
          font-weight: bold;
          font-size: 12px;
          height: 40px;
          ${(props): string => props.theme.mediaQueries.desktop} {
            height: 60px;
            font-size: 18px;
          } ;
        `;
      } else {
        return css`
          height: 40px;
          font-size: 16px;
        `;
      }
    }};
  }
`;
