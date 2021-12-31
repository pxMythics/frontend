import { Span } from 'components/base/span';
import { HeroSection } from 'components/hero-section';
import { PageLayout } from 'components/layout/page-layout';
import React from 'react';
import styled from 'styled-components';

export const MainPage: React.FunctionComponent = () => {
  return (
    <PageLayout>
      <HeroSection />
    </PageLayout>
  );
};
