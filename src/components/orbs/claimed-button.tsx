import { OrbsButton } from 'components/orbs/orbs-button';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const ClaimedButton: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return <OrbsButton disabled>{t('orbs.claim.button.alreadyClaimed')}</OrbsButton>;
};
