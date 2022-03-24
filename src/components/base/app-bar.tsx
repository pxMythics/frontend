import { AppBar as MuiAppBar, IconButton, MenuItem, Toolbar } from '@mui/material';
import { ReactComponent as DiscordLogo } from 'assets/img/discord-icon.svg';
import { ReactComponent as Logo } from 'assets/img/logo.svg';
import hamburgerMenu from 'assets/img/navbar_mobile_icon-menu.png';
import { ReactComponent as OpenSeaLogo } from 'assets/img/opensea-icon.svg';
import { ReactComponent as TwitterLogo } from 'assets/img/twitter-icon.svg';
import { Box } from 'components/base/box';
import { ExternalLink } from 'components/base/external-link';
import { InternalLink } from 'components/base/internal-link';
import { discordLink, openSeaLink, Section, twitterLink } from 'constant';
import { useOnMobile } from 'hooks/use-on-mobile';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { isMobileMenuOpen } from 'service/state';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

const MobileMenu: React.FunctionComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(isMobileMenuOpen);

  return (
    <>
      <MobileMenuContainer>
        <FixedHeightBox>
          <Logo />
        </FixedHeightBox>
      </MobileMenuContainer>
      {/*<AbsolutePositionIconButton onClick={() => setIsMenuOpen(!isMenuOpen)}>*/}
      {/*  <img src={hamburgerMenu} alt={'Menu'} />*/}
      {/*</AbsolutePositionIconButton>*/}
    </>
  );
};

const DesktopMenu: React.FunctionComponent = (props) => {
  const { t } = useTranslation();

  return (
    <DesktopMenuContainer {...props}>
      <CenteredContainer>
        <FixedHeightBox>
          <Logo />
        </FixedHeightBox>
        <MenuItemContainer>
          <StyledMenuItem>
            <InternalLink to={Section.HOME}>{t('menu.home')}</InternalLink>
          </StyledMenuItem>
          <StyledMenuItem>
            <InternalLink to={Section.ABOUT}>{t('menu.about')}</InternalLink>
          </StyledMenuItem>
          <StyledMenuItem>
            <InternalLink to={Section.ROADMAP}>{t('menu.roadmap')}</InternalLink>
          </StyledMenuItem>
          <StyledMenuItem>
            <InternalLink to={Section.TEAM}>{t('menu.team')}</InternalLink>
          </StyledMenuItem>
        </MenuItemContainer>
        <LinkContainer>
          <ExternalLink href={openSeaLink}>
            <OpenSeaLogo height={32} width={32} />
          </ExternalLink>
          <ExternalLink href={discordLink}>
            <DiscordLogo height={32} width={32} />
          </ExternalLink>
          <ExternalLink href={twitterLink}>
            <TwitterLogo height={32} width={32} />
          </ExternalLink>
        </LinkContainer>
        {/*<MintButton />*/}
      </CenteredContainer>
    </DesktopMenuContainer>
  );
};

export const AppBar: React.FunctionComponent = ({ ...rest }) => {
  const onMobile = useOnMobile();

  return (
    <StyledAppBar position={'sticky'} color={'transparent'} {...rest}>
      <AppToolbar>{onMobile ? <MobileMenu /> : <DesktopMenu />}</AppToolbar>
    </StyledAppBar>
  );
};

const AppToolbar = styled(Toolbar)`
  && {
    align-items: center;
    justify-content: center;
    background: ${(props): FlattenSimpleInterpolation | null => css`
      linear-gradient(180deg, 
        ${props.theme.palette.secondaryGradientStart.main} 0%, 
        ${props.theme.palette.secondaryGradientFinish.main} 100%);
    `};
    mix-blend-mode: normal;
    box-shadow: 0 9px 4px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(6px);
    height: 82px;
  }
`;

const StyledAppBar = styled(MuiAppBar)`
  && {
    box-shadow: none;
  }
`;

const DesktopMenuContainer = styled(Box)`
  width: 100%;
  flex: 1 1 auto;
  justify-content: center;
`;

const CenteredContainer = styled(Box)`
  width: 100%;
  flex: 1 1 auto;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
`;

const FixedHeightBox = styled(Box)`
  height: 62px;
`;

const MenuItemContainer = styled(Box)`
  padding-left: 80px;
  padding-right: 80px;
  justify-content: space-between;
  align-items: center;
`;

const StyledMenuItem = styled(MenuItem)`
  && {
    color: white;
    padding: 18px;
    font-weight: 500;
  }
`;

const LinkContainer = styled(Box)`
  height: 32px;
  padding-right: 16px;
  align-items: center;
  gap: 20px;
  svg {
    mix-blend-mode: overlay;
  }
`;

const MobileMenuContainer = styled(Box)`
  flex: 1 1 auto;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const AbsolutePositionIconButton = styled(IconButton)`
  && {
    position: absolute;
    right: 0;
  }
`;
