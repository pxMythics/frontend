import { Column } from 'components/base/column';
import React from 'react';
import shadow from 'assets/img/shadow.png';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

interface Props {
  shadowWidth?: number;
  shadowDistance?: number;
}
// TODO Does not work on mobile
export const ContainerWithShadow: React.FunctionComponent<Props> = ({
  shadowWidth,
  shadowDistance = 24,
  children,
  ...rest
}) => {
  return (
    <Column {...rest}>
      {children}
      <StyledImg src={shadow} shadowWidth={shadowWidth} shadowDistance={shadowDistance} />
    </Column>
  );
};

const StyledImg = styled(({ shadowWidth, ...renderProps }) => <img {...renderProps} />)<{
  shadowWidth?: number;
  shadowDistance: number;
}>`
  padding-top: ${(props): string => props.shadowDistance}px;
  ${(props): FlattenSimpleInterpolation | null => {
    if (props.shadowWidth) {
      return css`
        width: ${props.shadowWidth}px;
      `;
    } else {
      return css`
        width: 100%;
      `;
    }
  }}
  object-fit: cover;
`;
