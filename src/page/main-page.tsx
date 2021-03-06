import { AboutSection } from 'components/about-section';
import { Footer } from 'components/footer';
import { HeroSection } from 'components/hero-section';
import { PageLayout } from 'components/layout/page-layout';
import { RoadmapBottomSection } from 'components/roadmap-bottom-section';
import { RoadmapBottomSectionMobile } from 'components/roadmap-bottom-section-mobile';
import { RoadmapTopSection } from 'components/roadmap-top-section';
import { TeamSection } from 'components/team-section';
import { useOnMobile } from 'hooks/use-on-mobile';
import React from 'react';

export const MainPage: React.FunctionComponent = () => {
  const isMobile = useOnMobile();
  return (
    <PageLayout>
      <HeroSection />
      <AboutSection />
      <RoadmapTopSection />
      {isMobile ? <RoadmapBottomSectionMobile /> : <RoadmapBottomSection />}
      <TeamSection />
      <Footer />
    </PageLayout>
  );
};
