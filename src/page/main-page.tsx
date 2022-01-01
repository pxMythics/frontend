import { HeroSection } from 'components/hero-section';
import { PageLayout } from 'components/layout/page-layout';
import React from 'react';

export const MainPage: React.FunctionComponent = () => {
  return (
    <PageLayout>
      <HeroSection />
    </PageLayout>
  );
};
