import { ReactComponent as DiscordLogo } from 'assets/img/discord-icon.svg';
import { ReactComponent as OpenSeaLogo } from 'assets/img/opensea-icon.svg';
import { ReactComponent as TwitterLogo } from 'assets/img/twitter-icon.svg';
import { Box } from 'components/base/box';
import { MintButton } from 'components/mint/mint-button';
import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isMobileMenuOpen } from 'service/state';
import styled from 'styled-components';

interface Props {}

export const MobileSlidingMenu: React.FunctionComponent<Props> = (ß) => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(isMobileMenuOpen);

  return (
    <StyledMenu
      right
      isOpen={isMenuOpen}
      outerContainerId={'outer-container'}
      onStateChange={(state) => setIsMenuOpen(state.isOpen)}
    >
      <StyledLink to={'/#hero'}>{t('menu.home')}</StyledLink>
      <StyledLink to={'/#about'}>{t('menu.about')}</StyledLink>
      <StyledLink to={'/#roadmap'}>{t('menu.roadmap')}</StyledLink>
      <StyledLink to={'/#team'}>{t('menu.team')}</StyledLink>
      <LogoContainer>
        <OpenSeaLogo />
      </LogoContainer>
      <LogoContainer>
        <DiscordLogo />
      </LogoContainer>
      <LogoContainer>
        <TwitterLogo />
      </LogoContainer>
      <MintButton />
    </StyledMenu>
  );
};

const StyledMenu = styled(Menu)`
  /* General sidebar styles */
  .bm-menu {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(4px);
    padding: 24px;
  }
  .bm-item-list {
    display: flex;
    flex: none;
    position: relative;
    flex-direction: column;
    align-items: center;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #5a3a71;
  margin-bottom: 20px;
`;

const LogoContainer = styled(Box)`
  height: 56px;
  margin-bottom: 20px;
  > svg {
    height: 56px;
  }
`;
