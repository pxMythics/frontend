import { ReactComponent as DiscordLogo } from 'assets/img/discord-icon.svg';
import { ReactComponent as Logo } from 'assets/img/logo.svg';
import { ReactComponent as OpenSeaLogo } from 'assets/img/opensea-icon.svg';
import { ReactComponent as TwitterLogo } from 'assets/img/twitter-icon.svg';
import { Box } from 'components/base/box';
import { openDiscord, openTwitter } from 'constant';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export const Footer: React.FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <footer>
      <Container>
        <AlignedBox>
          <FixedHeightBox>
            <Logo />
          </FixedHeightBox>
          <Copyright>{t('footer.copyright')}</Copyright>
        </AlignedBox>
        <LinkContainer>
          <OpenSeaLogo />
          <DiscordLogo onClick={openDiscord} />
          <TwitterLogo onClick={openTwitter} />
        </LinkContainer>
      </Container>
    </footer>
  );
};

const Container = styled(Box)`
  padding: 0 128px;
  height: 150px;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.theme.palette.secondary.main};
`;

const AlignedBox = styled(Box)`
  align-items: center;
`;

const FixedHeightBox = styled(Box)`
  height: 70px;
`;

const Copyright = styled.span`
  padding-left: 8px;
  font-size: 14px;
  line-height: 17px;
`;

const LinkContainer = styled(Box)`
  height: 43px;
  padding-right: 24px;
  align-items: center;
  justify-content: space-between;
  > :not(:last-child) {
    margin-right: 24px;
  }
  > svg {
    height: 43px;
  }
`;
