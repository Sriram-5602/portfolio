import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Section from './components/Section';
import ShortProfile from './components/ShortProfile';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Certifications from './components/Certifications';
import Skills from './components/Skills';
import Blog from './components/Blog';
import FunSection from './components/FunSection';
import Contact from './components/Contact';
import ThemeToggle from './components/ThemeToggle';
import { portfolioData } from './data/portfolio';
import './App.css';

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="app">
      <ThemeToggle />
      <Header />
      <main>
        <Hero />
        <ShortProfile />
        <Projects />
        <Timeline />
        <Skills />
        <Certifications />
        {/* <Blog /> */}
        <FunSection />
        <Section id="contact" title="Contact" className="bg-white">
          <Contact />
        </Section>
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} {portfolioData.personalInfo.name}. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
