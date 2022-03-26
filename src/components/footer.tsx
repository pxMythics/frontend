import { ReactComponent as DiscordLogo } from 'assets/img/discord-icon.svg';
import { ReactComponent as Logo } from 'assets/img/logo.svg';
import { ReactComponent as OpenSeaLogo } from 'assets/img/opensea-icon.svg';
import { ReactComponent as TwitterLogo } from 'assets/img/twitter-icon.svg';
import { Box } from 'components/base/box';
import { Column } from 'components/base/column';
import { ExternalLink } from 'components/base/external-link';
import { discordLink, openSeaLink, twitterLink } from 'constant';
import { useMediaValues } from 'hooks/use-media-values';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export const Footer: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const logoWidth = useMediaValues<number>({ phone: 361, desktop: 239 });
  const logoHeight = useMediaValues<number>({ phone: 96, desktop: 70 });

  return (
    <Container>
      <CenteredContainer>
        <LinkContainer>
          <ExternalLink href={openSeaLink}>
            <OpenSeaLogo />
          </ExternalLink>
          <ExternalLink href={discordLink}>
            <DiscordLogo />
          </ExternalLink>
          <ExternalLink href={twitterLink}>
            <TwitterLogo />
          </ExternalLink>
        </LinkContainer>
        <LogoAndCopyrightContainer>
          <Logo width={logoWidth} height={logoHeight} />
          <Copyright>{t('footer.copyright')}</Copyright>
        </LogoAndCopyrightContainer>
      </CenteredContainer>
    </Container>
  );
};

const Container = styled(Column)`
  padding: 64px 46px;
  background: ${(props) => props.theme.palette.secondary.main};
  ${(props) => props.theme.mediaQueries.desktop} {
    align-items: center;
    padding: 38px 16px 44px;
  }
`;

const CenteredContainer = styled(Column)`
  width: 100%;
  flex: 1 1 auto;
  justify-content: center;
  ${(props) => props.theme.mediaQueries.desktop} {
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
  }
`;

const LogoAndCopyrightContainer = styled(Column)`
  gap: 18px;
  justify-content: center;
  align-items: center;
  ${(props) => props.theme.mediaQueries.desktop} {
    flex-direction: row;
    justify-content: flex-start;
    gap: 10px;
  }
`;

const Copyright = styled.span`
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  ${(props) => props.theme.mediaQueries.desktop} {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
  }
`;

const LinkContainer = styled(Box)`
  gap: 32px;
  margin-bottom: 56px;
  justify-content: center;
  > svg {
    height: 51px;
  }
  ${(props) => props.theme.mediaQueries.desktop} {
    gap: 24px;
    margin-right: 24px;
    margin-bottom: 0;
    justify-content: space-between;
    align-items: center;
    > svg {
      height: 43px;
    }
  }
`;
