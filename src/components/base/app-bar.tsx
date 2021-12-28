import { AppBar as MuiAppBar, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import { Box } from 'components/base/box';
import { MintButton } from 'components/mint-button';
import { useOnMobile } from 'hooks/use-on-mobile';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { ReactComponent as Logo } from 'assets/img/logo.svg';

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
      <LeftSpacer />
      <Logo />
      <MenuItemContainer>
        <StyledMenuItem>{t('menu.home')}</StyledMenuItem>
        <StyledMenuItem>{t('menu.about')}</StyledMenuItem>
        <StyledMenuItem>{t('menu.roadmap')}</StyledMenuItem>
        <StyledMenuItem>{t('menu.team')}</StyledMenuItem>
        <MintButton />
      </MenuItemContainer>
      <RightSpacer />
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
  width: 100%;
`;

const LeftSpacer = styled.div`
  max-width: 208px;
`;

const RightSpacer = styled.div`
  max-width: 275px;
`;

const MenuItemContainer = styled(Box)`
  margin-left: 158px;
  margin-right: 83px;
  justify-content: space-between;
`;

const StyledMenuItem = styled(MenuItem)`
  && {
    color: white;
    padding: 18;
  }
`;

const StyledMenu = styled(({ color, ...rest }) => <Menu {...rest} />)<{ color: string }>`
  && .MuiPaper-root {
    border-radius: 0;
    background-color: ${(props): string => props.color};
  }
`;

const StyledIconButton = styled(IconButton)``;

const BiggerFontLink = styled(Link)`
  font-size: 18px;
  > button {
    font-size: 18px;
  }
`;
