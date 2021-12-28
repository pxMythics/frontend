import { Button } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {}

export const MintButton: React.FunctionComponent<Props> = () => {
  const { t } = useTranslation();
  return <Button>{t('menu.mintButton')}</Button>;
};
