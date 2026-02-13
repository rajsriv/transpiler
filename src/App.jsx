import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Transpiler from './components/Transpiler';
import Pipeline from './components/Pipeline';
import Docs from './components/Docs';
import { useTranspiler } from './hooks/useTranspiler';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('transpiler');
  const { tokens, pythonCode, error, transpile } = useTranspiler();
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['transpiler', 'pipeline', 'docs'];
      const scrollPos = wrapperRef.current.scrollTop + 200;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    const wrapper = wrapperRef.current;
    if (wrapper) {
      wrapper.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (wrapper) {
        wrapper.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="app-container">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="main-content-wrapper" ref={wrapperRef}>
        <Hero />
        <Transpiler onTranspile={transpile} />
        <Pipeline tokens={tokens} pythonCode={pythonCode} error={error} />
        <Docs />
      </div>
    </div>
  );
}

export default App;
