import styled from 'styled-components';

export const StepContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  ${(props) => props.theme.mediaQueries.desktop} {
    width: unset;
    height: unset;
  }
`;
