import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FiSun, FiMoon, FiGlobe, FiMic } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';

const navLinks = [
  { name: 'Home', href: '#home', key: 'nav_home' },
  { name: 'About', href: '#about', key: 'nav_about' },
  { name: 'Skills', href: '#skills', key: 'nav_skills' },
  { name: 'Projects', href: '#projects', key: 'nav_projects' },
  { name: 'Experience', href: '#experience', key: 'nav_experience' },
  { name: 'Console', href: '#terminal', key: 'nav_console' },
  { name: 'Services', href: '#services', key: 'nav_services' },
  { name: 'Reviews', href: '#testimonials', key: 'nav_reviews' },
  { name: 'Credentials', href: '#certifications', key: 'nav_credentials' },
  { name: 'Guestbook', href: '#guestbook', key: 'nav_guestbook' },
  { name: 'Contact', href: '#contact', key: 'nav_contact' },
];

export default function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    // Detect scroll to style navbar background
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Active Section Highlight using IntersectionObserver
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -55% 0px', // Trigger near screen center
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    navLinks.forEach((link) => {
      const section = document.querySelector(link.href);
      if (section) observer.observe(section);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Theme Sync on Mount
  useEffect(() => {
    const isLight = document.documentElement.classList.contains('light-mode');
    setIsLightMode(isLight);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains('light-mode')) {
      root.classList.remove('light-mode');
      setIsLightMode(false);
    } else {
      root.classList.add('light-mode');
      setIsLightMode(true);
    }
  };

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const targetSection = document.querySelector(href);
    if (targetSection) {
      const offsetTop = targetSection.offsetTop;
      window.scrollTo({
        top: offsetTop - 80, // Offset for fixed navbar height
        behavior: 'smooth'
      });
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-45 transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-[var(--header-bg)] backdrop-blur-md border-b border-[var(--border-color)]' 
          : 'py-4.5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* Animated Logo */}
        <a 
          href="#home" 
          onClick={(e) => handleLinkClick(e, '#home')}
          className="flex items-center space-x-1.5 font-heading shrink-0"
        >
          <span className="text-xl sm:text-2xl font-black text-white select-none tracking-tight">
            ANKIT<span className="text-neon-cyan text-shadow-[0_0_10px_#00E5FF]">.</span>
          </span>
        </a>

        {/* Desktop Menu links */}
        <div className="hidden xl:flex items-center gap-0.5 xl:gap-2 font-ui text-[10px] xl:text-xs font-semibold">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`relative px-2.5 xl:px-3.5 py-1.5 transition-colors duration-300 rounded-full hover:text-[var(--color-text)] ${
                  isActive ? 'text-neon-cyan font-bold' : 'text-[var(--color-muted)]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-neon-cyan/10 rounded-full border border-neon-cyan/25 -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {t(link.key)}
              </a>
            );
          })}
        </div>

        {/* Action Buttons (Theme, Language & Hire Me) */}
        <div className="hidden xl:flex items-center space-x-3 shrink-0 select-none">
          
          {/* Voice Indicator */}
          <div 
            className="p-2 rounded-full border border-[var(--border-color)] bg-white/5 text-[10px] text-white/50 flex items-center gap-1 cursor-help"
            title="Voice Navigation Available. Click microphone icon at bottom right to speak."
          >
            <FiMic className="text-neon-cyan animate-pulse" />
            <span className="font-mono font-bold tracking-widest text-[8px] text-neon-cyan/80">VOICE_NAV</span>
          </div>

          {/* Language Switch Button */}
          <button
            onClick={toggleLanguage}
            className="px-3 py-2 rounded-full border border-[var(--border-color)] bg-white/5 hover:border-neon-cyan/40 hover:text-neon-cyan transition-all duration-300 font-mono text-[9px] font-bold flex items-center space-x-1.5 cursor-pointer"
            title="Switch Language"
          >
            <FiGlobe className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'EN' : 'HI'}</span>
          </button>

          {/* Light/Dark Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-[var(--border-color)] bg-white/5 hover:border-neon-cyan/40 hover:text-neon-cyan transition-all duration-300 cursor-pointer"
            title="Toggle Theme"
          >
            {isLightMode ? <FiMoon className="w-4 h-4" /> : <FiSun className="w-4 h-4" />}
          </button>

          {/* Hire Me Button */}
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="relative px-4.5 py-2.5 rounded-full font-heading text-xs font-semibold tracking-wider text-black bg-neon-cyan shadow-[0_0_12px_rgba(0,229,255,0.3)] hover:shadow-[0_0_20px_rgba(0,229,255,0.5)] hover:scale-105 transition-all duration-305 overflow-hidden group"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shine_1.5s_infinite] pointer-events-none" />
            {t('nav_hire_me')}
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center space-x-2 xl:hidden select-none">
          {/* Language Switcher (Mobile) */}
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1.5 rounded-full border border-[var(--border-color)] bg-white/5 text-[9px] font-bold font-mono flex items-center space-x-1 cursor-pointer"
          >
            <FiGlobe className="w-3 h-3" />
            <span>{language === 'en' ? 'EN' : 'HI'}</span>
          </button>

          {/* Theme Toggle (Mobile) */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-[var(--border-color)] bg-white/5 hover:text-neon-cyan transition-all duration-300 cursor-pointer"
            title="Toggle Theme"
          >
            {isLightMode ? <FiMoon className="w-4 h-4" /> : <FiSun className="w-4 h-4" />}
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-white"
            aria-label="Toggle Menu"
          >
            {isOpen ? <HiX className="w-6 h-6" /> : <HiMenuAlt3 className="w-6 h-6 text-neon-cyan" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="xl:hidden absolute top-full left-0 w-full border-b border-[var(--border-color)] bg-[var(--bg-sidebar)] backdrop-blur-lg overflow-hidden max-h-[85vh] overflow-y-auto"
          >
            <div className="flex flex-col px-6 py-4 space-y-2 font-ui text-sm font-medium">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-neon-cyan/15 text-neon-cyan border-l-2 border-neon-cyan' 
                        : 'text-[var(--color-muted)] hover:bg-white/5 hover:text-[var(--color-text)]'
                    }`}
                  >
                    {t(link.key)}
                  </a>
                );
              })}
              <div className="pt-3.5 border-t border-[var(--border-color)]">
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, '#contact')}
                  className="block text-center py-2.5 rounded-xl font-heading font-semibold text-black bg-neon-cyan shadow-[0_0_15px_rgba(0,229,255,0.35)]"
                >
                  {t('nav_hire_me')}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
