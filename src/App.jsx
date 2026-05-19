import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { FiArrowUp } from 'react-icons/fi';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    // Initialize Scroll Reveal Animations (AOS)
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-quad',
    });

    // Scroll percentage tracking for progress bar and Back-To-Top button
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const scrolled = (window.scrollY / totalScroll) * 100;
        setScrollProgress(scrolled);
      }
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isLoading ? (
        <Loader onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="relative min-h-screen text-[var(--color-text)] transition-colors duration-500 overflow-hidden selection:bg-neon-cyan/20 selection:text-white">
          {/* Custom Cursor Trail */}
          <CustomCursor />

          {/* Interactive Particle Backdrop Canvas */}
          <ParticleBackground />

          {/* Fixed Glowing Scroll Progress Bar */}
          <div 
            className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-neon-cyan to-blue-500 z-50 transition-all duration-100 shadow-[0_0_10px_#00E5FF]" 
            style={{ width: `${scrollProgress}%` }}
          />

          {/* Core Navigation System */}
          <Navbar />

          {/* Section Wrappers */}
          <main className="relative z-10 w-full">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Services />
            <Testimonials />
            <Certifications />
            <Contact />
          </main>

          {/* Footer branding */}
          <Footer />

          {/* Back-To-Top floating action button */}
          <button
            onClick={handleScrollToTop}
            className={`fixed bottom-6 right-6 z-40 p-3.5 rounded-full border border-neon-cyan/30 bg-black/60 backdrop-blur-md text-neon-cyan shadow-[0_0_15px_rgba(0,229,255,0.15)] hover:border-neon-cyan hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:scale-110 transition-all duration-300 ${
              showBackToTop ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-10 opacity-0 pointer-events-none'
            }`}
            title="Scroll to Top"
          >
            <FiArrowUp className="w-4.5 h-4.5" />
          </button>
        </div>
      )}
    </>
  );
}
