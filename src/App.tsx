import React, { useState } from 'react';
import { PageLoader } from './components/PageLoader';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { ServicesSection } from './sections/ServicesSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { SkillsSection } from './sections/SkillsSection';
import { IsometricShowcaseGrid } from './components/IsometricShowcaseGrid';
import { CorporateSpidermanSection } from './sections/CorporateSpidermanSection';
import { ContactSection } from './sections/ContactSection';
import { CinematicFooterSection } from './sections/CinematicFooterSection';

const App: React.FC = () => {
  const [isEntered, setIsEntered] = useState(false);

  return (
    <main
      style={{ overflowX: 'clip' }}
      className="relative w-full min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-kanit selection:bg-[#7621B0] selection:text-white"
    >
      {/* 0. 3D Animated Typing Keyboard Page Loader */}
      <PageLoader onLoaded={() => setIsEntered(true)} />

      {/* 1. Hero Section (Video starts playing from 0:00 only after entering) */}
      <HeroSection isEntered={isEntered} />

      {/* 2. About Section */}
      <AboutSection />

      {/* 3. Services Section */}
      <ServicesSection />

      {/* 4. Projects Section */}
      <ProjectsSection />

      {/* 5. Skills & Craft Section */}
      <SkillsSection />

      {/* 6. Isometric 3D Showcase Grid */}
      <IsometricShowcaseGrid />

      {/* 7. Corporate Spiderman Editorial Section */}
      <CorporateSpidermanSection />

      {/* 8. Contact Me Section with Left 3D Lanyard ID Card & Right StaggeredGrid Card */}
      <ContactSection />

      {/* 9. Full-Screen Panoramic VR Video Footer Showcase */}
      <CinematicFooterSection />
    </main>
  );
};

export default App;
