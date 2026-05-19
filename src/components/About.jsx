import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMapPin, FiBookOpen, FiActivity, FiGlobe } from 'react-icons/fi';

function StatCounter({ target, suffix = '', duration = 1.5 }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const end = parseInt(target, 10);
          if (isNaN(end)) return;
          const totalMs = duration * 1000;
          const stepTime = Math.max(Math.floor(totalMs / end), 15);

          const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= end) {
              clearInterval(timer);
              setCount(end);
            }
          }, stepTime);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
}

export default function About() {
  const stats = [
    { target: '10', suffix: '+', label: 'Technologies Mastered' },
    { target: '5', suffix: '+', label: 'Certifications Completed' },
    { target: '3', suffix: '+', label: 'Projects Built' },
    { target: '100', suffix: '%', label: 'Responsive Layouts' },
  ];

  const infoDetails = [
    { icon: <FiUser className="text-neon-cyan" />, label: 'Name', value: 'Ankit Chaudhary' },
    { icon: <FiMapPin className="text-neon-cyan" />, label: 'Location', value: 'Lucknow, India' },
    { icon: <FiBookOpen className="text-neon-cyan" />, label: 'Degree', value: 'BCA (Graduating 2026)' },
    { icon: <FiActivity className="text-neon-cyan" />, label: 'Academic SGPA', value: '8.40 / 10' },
    { icon: <FiGlobe className="text-neon-cyan" />, label: 'Languages', value: 'English, Hindi' },
  ];

  return (
    <section id="about" className="relative py-24 border-t border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-heading font-extrabold text-white tracking-tight"
          >
            About <span className="text-neon-cyan text-shadow-[0_0_15px_rgba(0,229,255,0.3)]">Me</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-neon-cyan mt-3 rounded-full shadow-[0_0_10px_#00E5FF]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column 1: Glowing HUD Photo Frame (Smiling Portrait) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="md:col-span-1 lg:col-span-4 flex flex-col justify-center items-center"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-[300px] aspect-[4/5] rounded-3xl p-1 bg-gradient-to-br from-neon-cyan via-blue-500 to-indigo-600 shadow-[0_0_35px_rgba(0,229,255,0.15)] group hover:shadow-[0_0_50px_rgba(0,229,255,0.35)] transition-all duration-500 overflow-hidden">
              
              {/* Cyber Scanline Overlay animation */}
              <div 
                className="absolute left-0 w-full h-[2.5px] bg-neon-cyan shadow-[0_0_12px_#00E5FF] z-20 pointer-events-none" 
                style={{
                  top: '0%',
                  animation: 'scan 4s linear infinite'
                }}
              />
              
              {/* Outer HUD border lines */}
              <div className="absolute inset-2 border border-white/10 rounded-[1.25rem] pointer-events-none z-10 group-hover:border-neon-cyan/25 transition-colors duration-500" />
              
              {/* Smiling portrait image */}
              <img 
                src="/ankit_smiling.jpeg" 
                alt="Ankit Chaudhary" 
                className="w-full h-full object-cover rounded-[1.4rem] filter brightness-[0.98] contrast-[1.02] transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* HUD corner brackets */}
              <span className="absolute top-4 left-4 w-4 h-4 border-t-[3px] border-l-[3px] border-neon-cyan z-20" />
              <span className="absolute top-4 right-4 w-4 h-4 border-t-[3px] border-r-[3px] border-neon-cyan z-20" />
              <span className="absolute bottom-4 left-4 w-4 h-4 border-b-[3px] border-l-[3px] border-neon-cyan z-20" />
              <span className="absolute bottom-4 right-4 w-4 h-4 border-b-[3px] border-r-[3px] border-neon-cyan z-20" />

              {/* Status scan overlay */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/80 backdrop-blur-sm border border-neon-cyan/30 rounded-md font-mono text-[8px] tracking-widest text-neon-cyan uppercase z-20">
                BIOMETRIC_OK
              </div>
            </div>
          </motion.div>

          {/* Column 2: Executive Bio & Info Cards */}
          <div className="md:col-span-1 lg:col-span-5 flex flex-col space-y-6">
            
            {/* Bio Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="glass-panel p-6 sm:p-8 rounded-2xl border-white/5 text-left flex-1"
            >
              <h3 className="text-xl font-heading font-bold text-white mb-4 flex items-center space-x-2">
                <span className="w-1.5 h-6 bg-neon-cyan rounded-full inline-block shadow-[0_0_8px_#00E5FF]" />
                <span>Executive Summary</span>
              </h3>
              <p className="font-body text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
                Motivated and detail-oriented BCA student with a strong interest in Frontend, Backend, Full Stack Development, AI Tools, and Technical Problem Solving. I enjoy building sleek web interfaces, engineering reliable server architectures, and analyzing data patterns to extract actionable insights.
              </p>
            </motion.div>

            {/* Info Grid Cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="grid grid-cols-1 gap-3.5"
            >
              {infoDetails.map((detail, idx) => (
                <div 
                  key={idx} 
                  className="glass-panel p-4 rounded-xl border-white/5 flex items-center space-x-4 hover:border-neon-cyan/25 interactive-card"
                >
                  <div className="w-9 h-9 rounded-lg bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center text-base shadow-[0_0_12px_rgba(0,229,255,0.05)] shrink-0">
                    {detail.icon}
                  </div>
                  <div className="text-left font-body min-w-0">
                    <span className="block text-[10px] text-[var(--color-muted)] uppercase tracking-wider">{detail.label}</span>
                    <span className="text-sm font-semibold text-white/90 truncate block">{detail.value}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Column 3: Stats Dashboard */}
          <div className="md:col-span-2 lg:col-span-3 flex flex-col justify-between">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-1 gap-4 h-full">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-panel p-5 rounded-2xl border-white/5 flex flex-col justify-center items-center text-center relative group hover:border-neon-cyan/35 interactive-card flex-1"
                >
                  {/* Decorative corner lines */}
                  <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-neon-cyan/20 rounded-tr-2xl group-hover:border-neon-cyan/60 transition-all duration-300" />
                  <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-neon-cyan/20 rounded-bl-2xl group-hover:border-neon-cyan/60 transition-all duration-300" />
                  
                  {/* Big Glowing Stat Number */}
                  <h3 className="text-3xl sm:text-4xl font-heading font-extrabold text-neon-cyan tracking-tight mb-1 text-neon-glow">
                    <StatCounter target={stat.target} suffix={stat.suffix} />
                  </h3>
                  
                  {/* Stat Label */}
                  <p className="font-ui text-[10px] sm:text-xs font-semibold text-white/80 uppercase tracking-widest leading-tight">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
