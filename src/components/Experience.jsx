import { motion } from 'framer-motion';
import { FiBriefcase, FiCheckCircle } from 'react-icons/fi';

export default function Experience() {
  const experiences = [
    {
      role: 'Project Engineer (Academic Role)',
      organization: 'BCA Academic Development Lab',
      period: '2023 - Present',
      description: 'Engineered robust full-stack web applications in collaborative team sprints, focusing on efficient RESTful backend services, responsive interfaces, and continuous integration workflows.',
      responsibilities: [
        'Full Stack Development: Built secure features using React.js and Spring Boot.',
        'Backend Development: Developed relational schema integrations and API routing protocols.',
        'Agile Workflow: Participated in task estimation, sprint planning, and system logs audit.',
        'Debugging & Testing: Diagnosed system bottlenecks and designed server validation structures.',
        'Team Collaboration: Coordinated code releases and documentation workflows.',
        'Code Reviews: Conducted clean code peer evaluations to optimize database queries and refactoring.'
      ]
    }
  ];

  return (
    <section id="experience" className="relative py-24 border-t border-white/5 bg-black/10">
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-neon-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">

        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-heading font-extrabold text-white tracking-tight"
          >
            Academic <span className="text-neon-cyan text-shadow-[0_0_15px_rgba(0,229,255,0.3)]">Experience</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-neon-cyan mt-3 rounded-full shadow-[0_0_10px_#00E5FF]"
          />
        </div>

        {/* Timeline Path */}
        <div className="relative border-l border-white/10 pl-6 md:pl-10 space-y-12 text-left max-w-3xl mx-auto py-4">
          
          {/* Vertical Glow Track overlay */}
          <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-neon-cyan via-blue-500 to-transparent pointer-events-none" />

          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Pulsing Node Point */}
              <span className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-black border border-neon-cyan flex items-center justify-center shadow-[0_0_10px_rgba(0,229,255,0.4)]">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
              </span>

              {/* Experience Card */}
              <div className="glass-panel p-6 md:p-8 rounded-2xl border-white/5 hover:border-neon-cyan/25 interactive-card relative overflow-hidden">
                {/* HUD Grid Overlay */}
                <div className="absolute top-0 right-0 w-16 h-16 opacity-[0.03] dot-bg-overlay" />
                
                {/* Header Information */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 mb-6">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-10 h-10 rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 flex items-center justify-center text-lg text-neon-cyan">
                      <FiBriefcase />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-heading font-extrabold text-white leading-tight">
                        {exp.role}
                      </h3>
                      <span className="text-xs font-mono font-semibold text-neon-cyan/80 uppercase tracking-widest">
                        {exp.organization}
                      </span>
                    </div>
                  </div>
                  
                  {/* Period badge */}
                  <span className="px-3.5 py-1.5 rounded-full border border-white/5 bg-white/5 font-mono text-xs font-semibold text-white/70 self-start md:self-auto">
                    {exp.period}
                  </span>
                </div>

                {/* Paragraph */}
                <p className="font-body text-sm md:text-base text-[var(--color-muted)] leading-relaxed mb-6">
                  {exp.description}
                </p>

                {/* Core Responsibilities Grid */}
                <div>
                  <h4 className="font-heading text-xs font-extrabold text-white tracking-widest uppercase mb-4.5">
                    CORE RESPONSIBILITIES:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {exp.responsibilities.map((resp, rIdx) => {
                      const [title, details] = resp.split(': ');
                      return (
                        <div key={rIdx} className="flex items-start space-x-2.5 font-body text-xs text-white/80">
                          <FiCheckCircle className="text-neon-cyan mt-0.5 shrink-0" />
                          <div>
                            <strong className="text-white font-semibold">{title}:</strong>
                            <span className="text-[var(--color-muted)]"> {details}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
