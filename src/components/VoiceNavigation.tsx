import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMic, FiMicOff, FiCheck, FiInfo } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function VoiceNavigation() {
  const { setLanguage } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [hudMessage, setHudMessage] = useState<string | null>(null);
  const [errorSupport, setErrorSupport] = useState(false);

  useEffect(() => {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setErrorSupport(true);
        return;
      }

      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onstart = () => {
        setIsListening(true);
        showHud('VOICE CONTROL ACTIVE. SPEAK COMMAND...');
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        processVoiceCommand(transcript);
      };

      rec.onerror = (e: any) => {
        console.error('Speech recognition error:', e);
        setIsListening(false);
        showHud('RECOGNITION ERROR / TIMEOUT');
      };

      rec.onend = () => {
        setIsListening(false);
      };

      setRecognition(rec);
    } catch (e) {
      console.warn('Speech recognition failed to initialize:', e);
      setErrorSupport(true);
    }
  }, []);

  const showHud = (msg: string) => {
    setHudMessage(msg);
    setTimeout(() => {
      setHudMessage(null);
    }, 3500);
  };

  const processVoiceCommand = (command: string) => {
    showHud(`RECOGNIZED: "${command.toUpperCase()}"`);

    // Define scrolling action
    const scrollToSection = (id: string) => {
      const el = document.querySelector(id);
      if (el) {
        const offsetTop = (el as HTMLElement).offsetTop;
        window.scrollTo({
          top: offsetTop - 80,
          behavior: 'smooth'
        });
        showHud(`SCROLLING TO ${id.slice(1).toUpperCase()}`);
      }
    };

    // Command matching
    if (command.includes('home') || command.includes('main')) {
      scrollToSection('#home');
    } else if (command.includes('about') || command.includes('bio')) {
      scrollToSection('#about');
    } else if (command.includes('skills')) {
      scrollToSection('#skills');
    } else if (command.includes('projects') || command.includes('work')) {
      scrollToSection('#projects');
    } else if (command.includes('experience')) {
      scrollToSection('#experience');
    } else if (command.includes('console') || command.includes('terminal')) {
      scrollToSection('#terminal');
    } else if (command.includes('services')) {
      scrollToSection('#services');
    } else if (command.includes('review') || command.includes('testimonial')) {
      scrollToSection('#testimonials');
    } else if (command.includes('certificat') || command.includes('credential')) {
      scrollToSection('#certifications');
    } else if (command.includes('guestbook') || command.includes('ledger') || command.includes('log')) {
      scrollToSection('#guestbook');
    } else if (command.includes('contact')) {
      scrollToSection('#contact');
    } else if (command.includes('light')) {
      document.documentElement.classList.add('light-mode');
      showHud('THEME TRIGGERED: LIGHT MODE');
    } else if (command.includes('dark')) {
      document.documentElement.classList.remove('light-mode');
      showHud('THEME TRIGGERED: DARK MODE');
    } else if (command.includes('hindi') || command.includes('हिंदी')) {
      setLanguage('hi');
      showHud('LANGUAGE TRIGGERED: HINDI');
    } else if (command.includes('english')) {
      setLanguage('en');
      showHud('LANGUAGE TRIGGERED: ENGLISH');
    } else {
      showHud('UNRECOGNIZED ROUTINE. TRY "skills", "projects", "dark", "hindi"');
    }
  };

  const toggleListening = () => {
    if (errorSupport) {
      showHud('SPEECH ENGINE NOT SUPPORTED IN THIS BROWSER.');
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  return (
    <div className="fixed bottom-6 right-20 z-40 font-mono text-[9px] flex items-center space-x-3 select-none">
      
      {/* Listening Status Overlay Notification */}
      <AnimatePresence>
        {hudMessage && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="px-3.5 py-2.5 rounded-xl border border-neon-cyan/35 bg-black/90 text-neon-cyan shadow-[0_0_15px_rgba(0,229,255,0.2)] backdrop-blur-md flex items-center space-x-2"
          >
            <FiInfo className="w-3.5 h-3.5 animate-pulse" />
            <span className="font-bold tracking-wider">{hudMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mic toggle trigger */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleListening}
        className={`p-3.5 rounded-full border text-white shadow-[0_0_15px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 relative group cursor-pointer ${
          isListening 
            ? 'bg-neon-cyan border-neon-cyan text-black shadow-[0_0_20px_rgba(0,229,255,0.4)] animate-pulse'
            : 'bg-black/60 border-white/10 hover:border-neon-cyan hover:shadow-[0_0_15px_rgba(0,229,255,0.2)]'
        }`}
        title="Voice Control"
      >
        {isListening ? <FiMic className="w-4 h-4 text-black" /> : <FiMicOff className="w-4 h-4 group-hover:text-neon-cyan" />}
      </motion.button>
    </div>
  );
}
