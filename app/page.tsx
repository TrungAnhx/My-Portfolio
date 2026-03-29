'use client';

import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import { Contact } from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900 text-slate-50' : 'bg-slate-50 text-slate-900'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero darkMode={darkMode} />
      <About darkMode={darkMode} />
      <Skills darkMode={darkMode} />
      <Projects darkMode={darkMode} />
      <Experience darkMode={darkMode} />
      <Contact darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </div>
  );
}
