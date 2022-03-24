import { ReactComponent as DiscordLogo } from 'assets/img/discord-icon.svg';
import { ReactComponent as OpenSeaLogo } from 'assets/img/opensea-icon.svg';
import { ReactComponent as TwitterLogo } from 'assets/img/twitter-icon.svg';
import { Column } from 'components/base/column';
import { ExternalLink } from 'components/base/external-link';
import { InternalLink } from 'components/base/internal-link';
import { discordLink, openSeaLink, Section, twitterLink } from 'constant';
import React, { useCallback } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { isMobileMenuOpen } from 'service/state';
import styled from 'styled-components';

export const MobileSlidingMenu: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(isMobileMenuOpen);

  const closeMenu = useCallback(() => setIsMenuOpen(false), [setIsMenuOpen]);

  return (
    <StyledMenu
      right
      isOpen={isMenuOpen}
      outerContainerId={'outer-container'}
      onStateChange={(state) => setIsMenuOpen(state.isOpen)}
    >
      <LinkContainer>
        <StyledLink to={Section.HOME} onClick={closeMenu}>
          {t('menu.home')}
        </StyledLink>
        <StyledLink to={Section.ABOUT} onClick={closeMenu}>
          {t('menu.about')}
        </StyledLink>
        <StyledLink to={Section.ROADMAP} onClick={closeMenu}>
          {t('menu.roadmap')}
        </StyledLink>
        <StyledLink to={Section.TEAM} onClick={closeMenu}>
          {t('menu.team')}
        </StyledLink>
      </LinkContainer>
      <LogoContainer>
        <ExternalLink href={openSeaLink}>
          <OpenSeaLogo />
        </ExternalLink>
        <ExternalLink href={discordLink}>
          <DiscordLogo />
        </ExternalLink>
        <ExternalLink href={twitterLink}>
          <TwitterLogo />
        </ExternalLink>
      </LogoContainer>
      {/*<MintButton />*/}
    </StyledMenu>
  );
};

const StyledMenu = styled(Menu)`
  /* General sidebar styles */
  .bm-menu {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(4px);
    padding: 56px 24px;
  }
  .bm-item-list {
    display: flex;
    flex: none;
    position: relative;
    flex-direction: column;
    align-items: center;
  }
`;

const StyledLink = styled(InternalLink)`
  && {
    color: #5a3a71;
    margin-bottom: 20px;
  }
`;

const LogoContainer = styled(Column)`
  && {
    display: flex !important;
  }
  margin: 32px 0;
  gap: 32px;
  svg {
    height: 56px;
  }
`;

const LinkContainer = styled(Column)`
  && {
    display: flex !important;
  }
  gap: 20px;
`;
