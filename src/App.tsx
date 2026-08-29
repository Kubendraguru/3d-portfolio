import React from 'react';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { ServicesSection } from './sections/ServicesSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { SkillsSection } from './sections/SkillsSection';
import { IsometricShowcaseGrid } from './components/IsometricShowcaseGrid';
import { ContactSection } from './sections/ContactSection';

const App: React.FC = () => {
  return (
    <main
      style={{ overflowX: 'clip' }}
      className="relative w-full min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-kanit selection:bg-[#7621B0] selection:text-white"
    >
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. About Section */}
      <AboutSection />

      {/* 3. Services Section */}
      <ServicesSection />

      {/* 4. Projects Section */}
      <ProjectsSection />

      {/* 5. Skills & Craft Section */}
      <SkillsSection />

      {/* 6. Isometric 3D Perspective Card Gallery ("You Can Trust") */}
      <IsometricShowcaseGrid />

      {/* 7. Contact Me Section with Left 3D Lanyard ID Card */}
      <ContactSection />
    </main>
  );
};

export default App;
