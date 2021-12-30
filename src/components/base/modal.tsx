import { Modal as MUIModal } from '@mui/material';
import { ModalProps } from '@mui/material/Modal/Modal';
import { Box } from 'components/base/box';
import React from 'react';
import styled from 'styled-components';

// TODO Add the logic to have the default modal has a close button
export const Modal: React.FunctionComponent<ModalProps> = ({ children, ...rest }) => {
  return (
    <MUIModal {...rest}>
      <CenteredBox>{children}</CenteredBox>
    </MUIModal>
  );
};

const CenteredBox = styled(Box)`
  align-items: center;
  background-color: black;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 500px;
  transform: translate(-50%, -50%);
  padding: 40px;
  border-radius: 20px;
`;
