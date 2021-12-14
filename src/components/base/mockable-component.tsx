import React, { ReactElement } from 'react';
import { isMock } from 'service/mock';

interface Props {
  renderComponent: ReactElement<any, any> | null;
  mockComponent: ReactElement<any, any> | null;
}

export const MockableComponent: React.FunctionComponent<Props> = ({
  renderComponent,
  mockComponent,
}) => {
  if (isMock()) {
    return mockComponent;
  }
  return renderComponent;
};
