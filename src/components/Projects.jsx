import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { FiCpu, FiHardDrive } from 'react-icons/fi';

function TiltCard({ children, className = '' }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / (rect.height / 12); // Rotate max ~8 degrees
    const rotateY = (x - centerX) / (rect.width / 12);

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-all duration-300 ease-out ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}

export default function Projects() {
  const projects = [
    {
      title: 'Real-time AI Chat App',
      category: 'AI / Full Stack',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      icon: <FiCpu className="text-neon-cyan" />,
      description: 'A responsive messaging web application powered by Gemini AI and WebSockets, facilitating instant conversations and auto-generated smart replies.',
      tech: ['Spring AI', 'Gemini API', 'React.js', 'WebSocket', 'Tailwind CSS'],
      features: ['Real-time messaging nodes', 'Gemini AI intelligent replies', 'Cyberpunk terminal dashboard layout'],
      demoLink: '#',
      githubLink: 'https://github.com/jsrankit11',
      hudMockup: (
        <div className="w-full h-full bg-black/60 backdrop-blur-[1px] group-hover:bg-black/40 transition-colors duration-300 rounded-t-xl border-b border-white/5 flex flex-col p-4 font-mono text-[10px] select-none text-white/70 overflow-hidden relative">
          <div className="absolute inset-0 grid-bg-overlay opacity-10" />
          <div className="flex justify-between items-center pb-2 border-b border-white/5 mb-3">
            <span className="text-neon-cyan flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse inline-block" />
              <span>AI_AGENT_CORE v1.0</span>
            </span>
            <span className="text-white/30 text-[8px]">PORT: 5050</span>
          </div>
          <div className="space-y-2.5 flex-1 flex flex-col justify-end">
            <div className="self-end bg-white/5 border border-white/5 rounded-lg px-2 py-1 max-w-[80%] text-right text-white/90">
              <span className="block text-[7px] text-white/40">USER@LOCALHOST</span>
              How do I deploy Spring Boot on AWS ECS?
            </div>
            <div className="self-start bg-neon-cyan/5 border border-neon-cyan/20 rounded-lg px-2 py-1 max-w-[80%] text-left text-neon-cyan">
              <span className="block text-[7px] text-neon-cyan/40">GEMINI_AI@CORE</span>
              Initializing deployment configuration... Use AWS ECS CLI or Fargate task templates.
            </div>
            <div className="w-full h-4 border border-neon-cyan/15 rounded-md flex items-center px-2 py-0.5 justify-between bg-black/60">
              <span>Message terminal...</span>
              <span className="text-neon-cyan animate-pulse">|</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Google Drive Clone',
      category: 'Cloud / Full Stack',
      image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80',
      icon: <FiHardDrive className="text-neon-cyan" />,
      description: 'A cloud file storage dashboard featuring multi-format file uploads, responsive folder configurations, secure user authentication, and data retrieval structures.',
      tech: ['React.js', 'Spring Boot', 'MySQL', 'REST API', 'Tailwind CSS'],
      features: ['File uploading & metadata rendering', 'Folder management hierarchy', 'User authorization & profiles'],
      demoLink: '#',
      githubLink: 'https://github.com/jsrankit11',
      hudMockup: (
        <div className="w-full h-full bg-black/60 backdrop-blur-[1px] group-hover:bg-black/40 transition-colors duration-300 rounded-t-xl border-b border-white/5 flex flex-col p-4 font-mono text-[10px] select-none text-white/70 overflow-hidden relative">
          <div className="absolute inset-0 grid-bg-overlay opacity-10" />
          <div className="flex justify-between items-center pb-2 border-b border-white/5 mb-3">
            <span className="text-neon-cyan flex items-center space-x-1.5">
              <span>CLOUD_STORAGE_NODE</span>
            </span>
            <span className="text-white/30 text-[8px]">CAPACITY: 15 GB</span>
          </div>
          <div className="space-y-3 flex-1 flex flex-col">
            <span className="text-[8px] text-white/40 text-left">FOLDERS</span>
            <div className="grid grid-cols-2 gap-2">
              <div className="border border-white/5 bg-white/5 p-1.5 rounded flex items-center space-x-2">
                <span className="text-yellow-500 text-xs">📁</span>
                <span className="text-[9px] font-bold text-white/80">React_Assets</span>
              </div>
              <div className="border border-white/5 bg-white/5 p-1.5 rounded flex items-center space-x-2">
                <span className="text-yellow-500 text-xs">📁</span>
                <span className="text-[9px] font-bold text-white/80">Java_Backend</span>
              </div>
            </div>
            <span className="text-[8px] text-white/40 text-left">RECENT FILES</span>
            <div className="border border-neon-cyan/20 bg-neon-cyan/5 p-2 rounded flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-neon-cyan text-xs">📄</span>
                <span className="text-[9px] font-bold text-white/90">application.properties</span>
              </div>
              <span className="text-[8px] text-neon-cyan">8.4 KB</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="projects" className="relative py-24 border-t border-white/5">
      {/* Background ambient light */}
      <div className="absolute bottom-1/2 left-1/4 w-96 h-96 bg-neon-cyan/5 blur-[120px] rounded-full pointer-events-none" />

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
            Featured <span className="text-neon-cyan text-shadow-[0_0_15px_rgba(0,229,255,0.3)]">Projects</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-neon-cyan mt-3 rounded-full shadow-[0_0_10px_#00E5FF]"
          />
        </div>

        {/* Projects Cards Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <TiltCard className="h-full">
                <div className="glass-panel rounded-2xl border-white/5 h-full flex flex-col justify-between overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.2)] group hover:border-neon-cyan/35 interactive-card">
                  
                  {/* HUD Vector Preview (Top visual part of the card) */}
                  <div className="h-44 w-full overflow-hidden relative border-b border-white/5 flex items-end">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-45 group-hover:scale-105 transition-all duration-500 filter brightness-[0.7] contrast-125"
                    />
                    
                    {project.hudMockup}
                    {/* Dark/Neon Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,15,29,0.85)] via-transparent to-transparent pointer-events-none" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-md border border-neon-cyan/20 bg-black/90 font-mono text-[9px] font-bold text-neon-cyan tracking-widest uppercase z-20">
                      {project.category}
                    </span>
                  </div>

                  {/* Project Details Description */}
                  <div className="p-6 text-left flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-3.5">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-lg border border-neon-cyan/20 bg-neon-cyan/5 flex items-center justify-center text-lg">
                          {project.icon}
                        </div>
                        <h3 className="text-lg md:text-xl font-heading font-extrabold text-white tracking-wide">
                          {project.title}
                        </h3>
                      </div>
                      
                      <p className="font-body text-sm text-[var(--color-muted)] leading-relaxed">
                        {project.description}
                      </p>

                      {/* Key Features List */}
                      <div className="space-y-1.5 font-body text-xs text-white/70">
                        {project.features.map((feature, fIdx) => (
                          <div key={fIdx} className="flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan/60 inline-block" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-5">
                      {/* Tech Stack Badges */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((techName, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-md border border-white/5 bg-white/5 font-mono text-[9px] font-semibold text-white/70 tracking-wider hover:border-neon-cyan/35 hover:text-neon-cyan transition-all duration-300"
                          >
                            {techName}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="flex space-x-4 border-t border-white/5 pt-4.5">
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2.5 font-heading text-xs font-semibold text-white/80 hover:text-neon-cyan transition-colors duration-300"
                        >
                          <FaGithub className="w-4 h-4" />
                          <span>SOURCE CODE</span>
                        </a>
                        <a
                          href={project.demoLink}
                          onClick={(e) => {
                            if (project.demoLink === '#') {
                              e.preventDefault();
                              alert(`Live demonstration triggered for "${project.title}". [Insert live deployment URL here]`);
                            }
                          }}
                          className="flex items-center space-x-2.5 font-heading text-xs font-semibold text-neon-cyan hover:text-white transition-colors duration-300"
                        >
                          <FaExternalLinkAlt className="w-3.5 h-3.5" />
                          <span>LIVE DEMO</span>
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
