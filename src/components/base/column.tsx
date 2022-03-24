import { BoxStyle } from 'components/base/box';
import React, { HTMLAttributes, MutableRefObject } from 'react';
import styled, { css } from 'styled-components';

interface Props extends HTMLAttributes<HTMLDivElement> {
  innerRef?: MutableRefObject<HTMLDivElement | null>;
}

export const Column: React.FunctionComponent<Props> = ({ innerRef, ...rest }) => (
  <SyledDiv ref={innerRef} {...rest} />
);

// TODO move this to theme
export const ColumnStyle = css`
  ${BoxStyle};
`;

const SyledDiv = styled.div`
  display: flex;
  flex: none;
  position: relative;
  flex-direction: column;
  min-height: 0;
`;
