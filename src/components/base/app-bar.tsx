import { AppBar as MuiAppBar, Menu, MenuItem, Toolbar } from '@mui/material';
import { ReactComponent as Logo } from 'assets/img/logo.svg';
import { ReactComponent as OpenSeaLogo } from 'assets/img/opensea-icon.svg';
import { ReactComponent as TwitterLogo } from 'assets/img/twitter-icon.svg';
import { ReactComponent as DiscordLogo } from 'assets/img/discord-icon.svg';
import { Box } from 'components/base/box';
import { MintButton, MintButtonStyle } from 'components/mint/mint-button';
import { useOnMobile } from 'hooks/use-on-mobile';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

const MobileMenu: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const onMobile = useOnMobile();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const closeMenu = () => {
    setAnchorEl(null);
  };

  if (!onMobile) {
    return null;
  }

  return (
    <>
      <StyledMenu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={closeMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <StyledMenuItem>{t('menu.artists')}</StyledMenuItem>
        <StyledMenuItem>{t('menu.about')}</StyledMenuItem>
        {!isMobile && <MenuItem />}
      </StyledMenu>
    </>
  );
};

const DesktopMenu: React.FunctionComponent = (props) => {
  const onMobile = useOnMobile();
  const { t } = useTranslation();

  if (onMobile) {
    return null;
  }

  return (
    <DesktopMenuContainer {...props}>
      <FixedHeightBox>
        <Logo />
      </FixedHeightBox>
      <MenuItemContainer>
        <StyledMenuItem>{t('menu.home')}</StyledMenuItem>
        <StyledMenuItem>{t('menu.about')}</StyledMenuItem>
        <StyledMenuItem>{t('menu.roadmap')}</StyledMenuItem>
        <StyledMenuItem>{t('menu.team')}</StyledMenuItem>
      </MenuItemContainer>
      <LinkContainer>
        <OpenSeaLogo />
        <DiscordLogo />
        <TwitterLogo />
      </LinkContainer>
      <MintButton style={MintButtonStyle.SHORT} />
    </DesktopMenuContainer>
  );
};

export const AppBar: React.FunctionComponent = ({ ...rest }) => {
  return (
    <StyledAppBar position="sticky" color={'transparent'} {...rest}>
      <StyledToolbar>
        <MobileMenu />
        <DesktopMenu />
      </StyledToolbar>
    </StyledAppBar>
  );
};

const StyledToolbar = styled(Toolbar)`
  && {
    align-items: center;
    background: ${(props): FlattenSimpleInterpolation | null => css`
      linear-gradient(180deg, 
        ${props.theme.palette.secondaryGradientStart.main} 0%, 
        ${props.theme.palette.secondaryGradientFinish.main} 100%);
    `};
    mix-blend-mode: normal;
    box-shadow: 0 9px 4px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(6px);
    min-height: 82px;
    ${(props): string => props.theme.mediaQueries.desktop} {
      min-height: 90px;
    }
  }
`;

const StyledAppBar = styled(MuiAppBar)`
  && {
    box-shadow: none;
  }
`;

const DesktopMenuContainer = styled(Box)`
  flex: 1;
  margin-left: 184px;
  margin-right: 184px;
  align-items: center;
  justify-content: space-between;
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
  }
`;

const LinkContainer = styled(Box)`
  height: 32px;
  padding-right: 16px;
  align-items: center;
  justify-content: space-between;
  > svg {
    height: 32px;
    mix-blend-mode: overlay;
  }
`;

const StyledMenu = styled(({ color, ...rest }) => <Menu {...rest} />)<{ color: string }>`
  && .MuiPaper-root {
    border-radius: 0;
    background-color: ${(props): string => props.color};
  }
`;
