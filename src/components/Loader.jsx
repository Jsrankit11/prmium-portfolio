import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  const logs = [
    'CONNECTING TO CORE PROTOCOL...',
    'INITIALIZING FUTURISTIC DESIGN SCHEMES...',
    'COMPILING COMPONENT STACK...',
    'ESTABLISHING GLOWING NEON BORDERS...',
    'ACTIVATING MACHINE LEARNING MODULES...',
    'PORTFOLIO STATUS: ONLINE.'
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            onComplete();
          }, 800); // Small pause for the final state
          return 100;
        }
        // Random incremental steps for organic feel
        const next = prev + Math.floor(Math.random() * 8) + 2;
        return next > 100 ? 100 : next;
      });
    }, 60);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  useEffect(() => {
    // Show different system logs based on loading progress
    const segment = 100 / logs.length;
    const index = Math.min(Math.floor(progress / segment), logs.length - 1);
    setLogIndex(index);
  }, [progress]);

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center font-heading text-white px-4">
      {/* Grid Overlay background */}
      <div className="absolute inset-0 grid-bg-overlay opacity-30 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center">
        {/* Neon Logo / Monogram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-20 h-20 rounded-2xl border border-neon-cyan/40 flex items-center justify-center mb-8 relative shadow-[0_0_30px_rgba(0,229,255,0.2)]"
        >
          <div className="absolute inset-0.5 rounded-2xl bg-black/80" />
          <span className="relative text-3xl font-bold text-neon-cyan tracking-wider">AC</span>
          <div className="absolute -inset-1 border border-neon-cyan/20 rounded-2xl blur-sm animate-pulse" />
        </motion.div>

        {/* Progress Text */}
        <motion.h2 
          className="text-4xl md:text-5xl font-extrabold text-white tracking-widest mb-2"
        >
          {progress}<span className="text-neon-cyan text-2xl md:text-3xl">%</span>
        </motion.h2>
        
        {/* Glow Bar Container */}
        <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden mb-6 relative border border-white/5">
          <motion.div 
            className="h-full bg-gradient-to-r from-neon-cyan to-blue-500 shadow-[0_0_12px_#00E5FF]"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>

        {/* Cyber Logs Console */}
        <div className="h-10 font-body text-xs md:text-sm tracking-wider text-neon-cyan/80 uppercase font-medium">
          <AnimatePresence mode="wait">
            <motion.div
              key={logIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {logs[logIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Loading Indicator Dots */}
        <div className="flex space-x-1.5 mt-8">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-neon-cyan"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
