import React from 'react';
import { HeroSection } from './sections/HeroSection';
import { MarqueeSection } from './sections/MarqueeSection';
import { AboutSection } from './sections/AboutSection';
import { ServicesSection } from './sections/ServicesSection';
import { ProjectsSection } from './sections/ProjectsSection';

const App: React.FC = () => {
  return (
    <main
      style={{ overflowX: 'clip' }}
      className="relative w-full min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-kanit selection:bg-[#7621B0] selection:text-white"
    >
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Marquee Section */}
      <MarqueeSection />

      {/* 3. About Section */}
      <AboutSection />

      {/* 4. Services Section */}
      <ServicesSection />

      {/* 5. Projects Section */}
      <ProjectsSection />
    </main>
  );
};

export default App;
