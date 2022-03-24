import { Button, ButtonProps } from '@mui/material';
import React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

export const BaseButton: React.FunctionComponent<ButtonProps> = (props) => (
  <StyledButton {...props} />
);

const StyledButton = styled(Button)`
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
    border: 2px solid #ffffff;
    padding: 12px 24px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
  }
`;
