import { motion } from 'framer-motion';
import { FiLayout, FiServer, FiLayers, FiBarChart2, FiCompass, FiCpu } from 'react-icons/fi';

export default function Services() {
  const services = [
    {
      icon: <FiLayout className="text-neon-cyan" />,
      title: 'Frontend Development',
      description: 'Engineering responsive, interactive client-side interfaces using React, JavaScript, and Tailwind CSS. Crafting sleek animations with GSAP and Framer Motion.'
    },
    {
      icon: <FiServer className="text-neon-cyan" />,
      title: 'Backend Development',
      description: 'Designing high-performance, secure RESTful server layers using Spring Boot, Node.js, and PHP. Crafting optimized database queries for structured schemas.'
    },
    {
      icon: <FiLayers className="text-neon-cyan" />,
      title: 'Full Stack Development',
      description: 'Assembling unified end-to-end web apps from initial visual designs to server routing, API integrations, secure authentication, and cloud deployment.'
    },
    {
      icon: <FiBarChart2 className="text-neon-cyan" />,
      title: 'Data Analysis',
      description: 'Analyzing complex data patterns, extracting key insights, and structuring relational database queries (SQL/NoSQL) to generate reports and visualizations.'
    },
    {
      icon: <FiCompass className="text-neon-cyan" />,
      title: 'UI/UX Design',
      description: 'Designing intuitive user experience mockups, grid wireframes, typography schemes, and glassmorphic micro-animations to improve digital interaction.'
    },
    {
      icon: <FiCpu className="text-neon-cyan" />,
      title: 'AI Integration',
      description: 'Connecting AI large language model APIs (like Gemini and OpenAI) into web backends to build smart replies, auto-categorizations, and prompt solutions.'
    }
  ];

  return (
    <section id="services" className="relative py-24 border-t border-white/5">
      
      {/* Background ambient lighting */}
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-neon-cyan/5 blur-[130px] rounded-full pointer-events-none" />

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
            My <span className="text-neon-cyan text-shadow-[0_0_15px_rgba(0,229,255,0.3)]">Services</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-neon-cyan mt-3 rounded-full shadow-[0_0_10px_#00E5FF]"
          />
        </div>

        {/* Services Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="glass-panel p-6.5 rounded-2xl border-white/5 flex flex-col justify-between items-start text-left group hover:border-neon-cyan/35 interactive-card relative overflow-hidden h-full"
            >
              {/* Decorative HUD Corner Accent */}
              <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/10 group-hover:border-neon-cyan/50 transition-all duration-300" />
              
              {/* Icon Container */}
              <div className="w-11 h-11 rounded-xl border border-neon-cyan/25 bg-neon-cyan/5 flex items-center justify-center text-xl mb-6 shadow-[0_0_15px_rgba(0,229,255,0.05)] group-hover:shadow-[0_0_20px_rgba(0,229,255,0.2)] group-hover:bg-neon-cyan/10 transition-all duration-300">
                {service.icon}
              </div>

              {/* Title & Description */}
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-heading font-extrabold text-white mb-3 group-hover:text-neon-cyan transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="font-body text-sm text-[var(--color-muted)] leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Small accent arrow bar */}
              <div className="w-full mt-6 pt-4 border-t border-white/5 flex justify-end items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] font-mono font-bold text-neon-cyan mr-1.5 uppercase tracking-widest">
                  SYS_ACTIVE
                </span>
                <span className="text-neon-cyan text-sm font-semibold">→</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
