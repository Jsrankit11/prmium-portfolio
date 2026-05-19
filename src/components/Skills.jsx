import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const skillCategories = [
  { id: 'all', name: 'All Skills' },
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
  { id: 'programming', name: 'Programming' },
  { id: 'database', name: 'Database' },
  { id: 'other', name: 'Tools & Concepts' },
  { id: 'soft', name: 'Soft Skills' }
];

const skillsData = [
  // Frontend
  { name: 'HTML5', value: 95, category: 'frontend' },
  { name: 'CSS3', value: 90, category: 'frontend' },
  { name: 'JavaScript', value: 92, category: 'frontend' },
  { name: 'React.js', value: 88, category: 'frontend' },
  { name: 'Tailwind CSS', value: 92, category: 'frontend' },
  
  // Backend
  { name: 'Node.js', value: 85, category: 'backend' },
  { name: 'Express.js', value: 82, category: 'backend' },
  { name: 'Spring Boot', value: 78, category: 'backend' },
  { name: 'PHP', value: 70, category: 'backend' },
  
  // Programming
  { name: 'Python', value: 85, category: 'programming' },
  { name: 'Java', value: 82, category: 'programming' },
  { name: 'C++', value: 80, category: 'programming' },
  { name: 'C', value: 75, category: 'programming' },
  
  // Database
  { name: 'MySQL', value: 88, category: 'database' },
  { name: 'MongoDB', value: 80, category: 'database' },
  { name: 'PostgreSQL', value: 82, category: 'database' },
  
  // Other
  { name: 'AWS', value: 75, category: 'other' },
  { name: 'GitHub', value: 90, category: 'other' },
  { name: 'REST APIs', value: 88, category: 'other' },
  { name: 'AI Tools', value: 92, category: 'other' },
  { name: 'Prompt Engineering', value: 90, category: 'other' },
  { name: 'WebSocket', value: 80, category: 'other' },
  { name: 'DBMS', value: 85, category: 'other' },
  { name: 'OOPS', value: 88, category: 'other' },
  
  // Soft Skills
  { name: 'Communication', value: 90, category: 'soft' },
  { name: 'Problem Solving', value: 92, category: 'soft' },
  { name: 'Team Collaboration', value: 88, category: 'soft' },
  { name: 'Multitasking', value: 85, category: 'soft' },
  { name: 'Visual Design', value: 80, category: 'soft' }
];

const marqueeSkills = [
  'React.js', 'Node.js', 'Spring Boot', 'Python', 'Java', 'Tailwind CSS', 
  'MySQL', 'MongoDB', 'AWS', 'GitHub', 'REST APIs', 'AI Prompting', 'WebSockets'
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredSkills = activeTab === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeTab);

  return (
    <section id="skills" className="relative py-24 border-t border-white/5 bg-black/10">
      
      {/* Glow highlight */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-neon-cyan/5 blur-[120px] rounded-full pointer-events-none" />

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
            My <span className="text-neon-cyan text-shadow-[0_0_15px_rgba(0,229,255,0.3)]">Skills</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-neon-cyan mt-3 rounded-full shadow-[0_0_10px_#00E5FF]"
          />
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12 font-ui text-sm font-semibold max-w-4xl mx-auto">
          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`relative px-5 py-2.5 rounded-full border transition-all duration-300 ${
                activeTab === category.id
                  ? 'border-neon-cyan text-black bg-neon-cyan shadow-[0_0_15px_rgba(0,229,255,0.25)]'
                  : 'border-[var(--border-color)] text-[var(--color-muted)] hover:text-white hover:border-white/20 bg-white/5'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Skill Progress Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 min-h-[350px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={skill.name}
                className="glass-panel p-5 rounded-2xl border-white/5 flex flex-col justify-between hover:border-neon-cyan/20 interactive-card relative overflow-hidden"
              >
                {/* Decorative Tech Grid */}
                <div className="absolute top-0 right-0 w-8 h-8 opacity-[0.03] dot-bg-overlay" />
                
                {/* Header (Skill Name & Percentage) */}
                <div className="flex justify-between items-center mb-3">
                  <span className="font-heading text-sm font-bold text-white/90 tracking-wide uppercase">{skill.name}</span>
                  <span className="font-mono text-xs font-semibold text-neon-cyan text-neon-glow">{skill.value}%</span>
                </div>

                {/* Progress bar tracker */}
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
                  <motion.div
                    className="h-full bg-gradient-to-r from-neon-cyan to-blue-500 rounded-full shadow-[0_0_10px_rgba(0,229,255,0.3)]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Infinite Marquee Showcase */}
        <div className="relative w-full py-8 border-y border-white/5 overflow-hidden select-none">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--bg-main)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--bg-main)] to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee gap-8">
            {/* First Set of Items */}
            {marqueeSkills.map((skill, index) => (
              <div
                key={`marquee-1-${index}`}
                className="px-6 py-2.5 rounded-xl border border-neon-cyan/15 bg-neon-cyan/5 text-neon-cyan text-sm font-mono font-bold tracking-wider uppercase flex items-center space-x-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan shadow-[0_0_6px_#00E5FF]" />
                <span>{skill}</span>
              </div>
            ))}
            {/* Duplicate Set for Infinite Scroll */}
            {marqueeSkills.map((skill, index) => (
              <div
                key={`marquee-2-${index}`}
                className="px-6 py-2.5 rounded-xl border border-neon-cyan/15 bg-neon-cyan/5 text-neon-cyan text-sm font-mono font-bold tracking-wider uppercase flex items-center space-x-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan shadow-[0_0_6px_#00E5FF]" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
