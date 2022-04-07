import { Button } from '@mui/material';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

export const OrbsButton = styled(Button)`
  && {
    margin-top: 64px;
    background: ${(props): FlattenSimpleInterpolation | null => css`
      linear-gradient(180deg,
        ${props.theme.palette.primaryGradientStart.main} 49.38%,
        ${props.theme.palette.primaryGradientFinish.main} 100%,
      ${props.theme.palette.primaryGradientFinish.main} 100%,
      ${props.theme.palette.primaryGradientFinish.main} 100%);
    `};
    border-radius: 12px;
    border: 2px solid #ffffff;
    color: #fff;
    font-weight: bold;
    font-size: 12px;
    height: 40px;
    ${(props): string => props.theme.mediaQueries.desktop} {
      margin-top: 128px;
    }
    :focus {
      outline: none;
    }
  }
  &&&.Mui-disabled {
      color: #fff;
      opacity: 0.3;
    }
  }
`;
