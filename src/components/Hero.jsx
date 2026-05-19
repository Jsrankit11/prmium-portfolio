import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaGithub, FaInstagram, FaWhatsapp, FaDownload } from 'react-icons/fa';
import { FiMessageSquare } from 'react-icons/fi';

const words = ['React Developer', 'Backend Developer', 'Data Analyst', 'AI Enthusiast'];

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleType = () => {
      const fullWord = words[currentWordIndex];
      if (!isDeleting) {
        // Typing
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        setTypingSpeed(100);
        if (currentText === fullWord) {
          // Pause before deleting
          setTypingSpeed(1800);
          setIsDeleting(true);
        }
      } else {
        // Deleting
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        setTypingSpeed(50);
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          setTypingSpeed(400); // Small delay before next word
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, typingSpeed]);

  const socialLinks = [
    { icon: <FaLinkedinIn />, url: 'https://linkedin.com/in/ankit-chaudhary-b3555a322', color: 'hover:text-[#0077b5] hover:border-[#0077b5]/50 hover:shadow-[0_0_15px_rgba(0,119,181,0.4)]' },
    { icon: <FaGithub />, url: 'https://github.com/jsrankit11', color: 'hover:text-[#ffffff] hover:border-[#ffffff]/50 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]' },
    { icon: <FaInstagram />, url: 'https://instagram.com/instaholic_ankit', color: 'hover:text-[#e1306c] hover:border-[#e1306c]/50 hover:shadow-[0_0_15px_rgba(225,48,108,0.4)]' },
    { icon: <FaWhatsapp />, url: 'https://wa.me/918081039242', color: 'hover:text-[#25d366] hover:border-[#25d366]/50 hover:shadow-[0_0_15px_rgba(37,211,102,0.4)]' },
  ];

  const handleContactClick = (e) => {
    e.preventDefault();
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background Grids & Dots */}
      <div className="absolute inset-0 grid-bg-overlay opacity-40 pointer-events-none" />
      <div className="absolute inset-0 dot-bg-overlay opacity-30 pointer-events-none" />

      {/* Futuristic Glow backlights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-neon-cyan/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-blue-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Text Area */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          
          {/* Welcome Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="px-4 py-1.5 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan text-xs font-semibold tracking-widest uppercase shadow-[0_0_15px_rgba(0,229,255,0.08)]"
          >
            WELCOME TO THE FUTURE OF DEVELOPMENT
          </motion.div>

          {/* Large Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight leading-none text-white select-none"
          >
            Ankit Chaudhary
            <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-blue-400 to-indigo-500 text-shadow-[0_0_30px_rgba(0,229,255,0.2)]">
              Full Stack Developer <br className="hidden sm:inline" />& Data Analyst
            </span>
          </motion.h1>

          {/* Typewriter text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-8 flex items-center font-ui text-xl md:text-2xl text-white/90 font-medium"
          >
            <span>I'm a&nbsp;</span>
            <span className="text-neon-cyan border-r-2 border-neon-cyan animate-[blink_0.8s_step-end_infinite] font-semibold text-shadow-[0_0_8px_rgba(0,229,255,0.3)]">
              {currentText}
            </span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-xl font-body text-base md:text-lg text-[var(--color-muted)] leading-relaxed"
          >
            I build scalable web applications, modern UI/UX experiences, and intelligent AI-powered solutions.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto"
          >
            {/* Download Resume button */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert("Resume download triggered. [Insert link to resume here]");
              }}
              className="relative px-8 py-3.5 rounded-full font-heading text-sm font-semibold tracking-wider text-black bg-neon-cyan shadow-[0_0_20px_rgba(0,229,255,0.25)] hover:shadow-[0_0_30px_rgba(0,229,255,0.55)] hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2.5 group overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:animate-[shine_1.5s_infinite]" />
              <FaDownload className="w-4 h-4" />
              <span>DOWNLOAD RESUME</span>
            </a>

            {/* Contact Me button */}
            <a
              href="#contact"
              onClick={handleContactClick}
              className="px-8 py-3.5 rounded-full font-heading text-sm font-semibold tracking-wider text-white border border-[var(--border-color)] bg-white/5 hover:bg-neon-cyan/10 hover:border-neon-cyan/40 hover:text-neon-cyan hover:scale-105 hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] transition-all duration-300 flex items-center justify-center space-x-2.5"
            >
              <FiMessageSquare className="w-4.5 h-4.5" />
              <span>CONTACT ME</span>
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="flex space-x-4.5 pt-4"
          >
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-xl border border-[var(--border-color)] bg-white/5 flex items-center justify-center text-white/70 transition-all duration-300 ${social.color}`}
              >
                {social.icon}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Profile / 3D Canvas Visualizer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-5 flex justify-center relative select-none"
        >
          {/* Animated float profile container */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 animate-float-slow">
            
            {/* Ambient Background Circle */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-neon-cyan to-indigo-600 blur-2xl opacity-20 animate-pulse" />
            
            {/* Outer Rotating Glowing Octagon / Ring */}
            <div className="absolute inset-0 rounded-[2.5rem] border border-neon-cyan/20 animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-3 rounded-[2.5rem] border border-blue-500/10 animate-[spin_15s_linear_infinite_reverse]" />

            {/* Main Cyber Glass Card */}
            <div className="absolute inset-6 rounded-[2rem] glass-panel p-6 flex flex-col justify-between overflow-hidden shadow-[0_0_40px_rgba(0,229,255,0.05)] border-white/5">
              
              {/* Card Header (Console style) */}
              <div className="flex justify-between items-center pb-3 border-b border-white/5">
                <div className="flex space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="text-[10px] font-mono tracking-widest text-neon-cyan/80">ANKIT_SECURE_ID</span>
              </div>

              {/* Developer Avatar Mockup */}
              <div className="flex-1 flex flex-col items-center justify-center py-4 relative">
                
                {/* Glowing Core behind profile */}
                <div className="absolute w-28 h-28 rounded-full bg-neon-cyan/10 blur-xl pointer-events-none" />
                
                {/* Real Developer Image */}
                <div className="relative w-28 h-28 rounded-full p-[2px] bg-gradient-to-tr from-neon-cyan via-blue-500 to-indigo-500 shadow-[0_0_20px_rgba(0,229,255,0.3)] group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src="/ankit_formal.jpeg" 
                    alt="Ankit Chaudhary" 
                    className="w-full h-full object-cover rounded-full filter brightness-95 contrast-100"
                  />
                </div>

                {/* Cyber HUD elements */}
                <div className="absolute top-2 left-2 text-[9px] font-mono text-white/30 text-left">
                  SYS.STATUS: ACTIVE<br/>
                  MEM.LOAD: 42%
                </div>
                <div className="absolute bottom-2 right-2 text-[9px] font-mono text-white/30 text-right">
                  SPEED: 1.2 GB/s<br/>
                  LOC: LKO, IND
                </div>
              </div>

              {/* Bottom statistics panel */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-left font-mono">
                <div>
                  <span className="block text-[10px] text-white/40 uppercase">IP CONFIG</span>
                  <span className="text-xs text-white/80 font-bold">192.168.1.104</span>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] text-white/40 uppercase">SECURE SHELL</span>
                  <span className="text-xs text-neon-cyan font-bold">CONNECTED</span>
                </div>
              </div>
            </div>
            
            {/* Tiny Floating Badges */}
            <div className="absolute -top-2 -right-2 glass-panel px-3 py-1.5 rounded-xl border-neon-cyan/20 text-xs font-mono text-neon-cyan shadow-[0_0_12px_rgba(0,229,255,0.2)]">
              React v19
            </div>
            <div className="absolute -bottom-2 -left-2 glass-panel px-3 py-1.5 rounded-xl border-blue-500/20 text-xs font-mono text-blue-400 shadow-[0_0_12px_rgba(0,229,255,0.1)]">
              Data Science
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
