import { Box } from 'components/base/box';
import { ContainerWithShadow } from 'components/base/container-with-shadow';
import { useOnMobile } from 'hooks/use-on-mobile';
import React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

export interface ImageSlideProps {
  src: string;
  alt: string;
}

export const ImageSlide: React.FunctionComponent<ImageSlideProps> = ({ src, alt, ...rest }) => {
  const isMobile = useOnMobile();
  return isMobile ? (
    <ContainerWithShadow shadowWidth={200}>
      <ImageContainer>
        <img src={src} alt={alt} />
      </ImageContainer>
    </ContainerWithShadow>
  ) : (
    <ContainerWithShadow>
      <ImageContainer>
        <img src={src} alt={alt} />
      </ImageContainer>
    </ContainerWithShadow>
  );
};

const ImageContainer = styled(Box)`
  height: 200px;
  width: 200px;
  ${(props): string => props.theme.mediaQueries.tablet} {
    height: 280px;
    width: 280px;
  }
  ${(props): string => props.theme.mediaQueries.desktop} {
    height: 380px;
    width: 380px;
  }
  border: 3px solid
    ${(props): FlattenSimpleInterpolation | null => css`
      ${props.theme.palette.primaryGradientFinish.main}
    `};
  border-radius: 25px;
  overflow: hidden;
`;
