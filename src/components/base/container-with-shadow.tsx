import { Column } from 'components/base/column';
import React from 'react';
import shadow from 'assets/img/shadow.png';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

interface Props {
  shadowWidth?: number;
}
// TODO Does not work on mobile
export const ContainerWithShadow: React.FunctionComponent<Props> = ({
  shadowWidth,
  children,
  ...rest
}) => {
  return (
    <Column {...rest}>
      {children}
      <StyledImg src={shadow} shadowWidth={shadowWidth} />
    </Column>
  );
};

const StyledImg = styled(({ shadowWidth, ...renderProps }) => <img {...renderProps} />)<{
  shadowWidth: number;
}>`
  padding-top: 24px;
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
