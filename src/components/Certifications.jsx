import { motion } from 'framer-motion';
import { FiAward, FiCheckCircle } from 'react-icons/fi';

export default function Certifications() {
  const certifications = [
    {
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services (AWS)',
      status: 'VERIFIED',
      id: 'AWS-CCP-982'
    },
    {
      title: 'Python Programming Certification',
      issuer: 'Academic Certification Body',
      status: 'VERIFIED',
      id: 'PY-PROG-104'
    },
    {
      title: 'Google Cloud Training',
      issuer: 'Google Cloud Platform (Qwiklabs)',
      status: 'COMPLETED',
      id: 'GCP-TRN-789'
    },
    {
      title: 'Node.js Development',
      issuer: 'Backend Development Institute',
      status: 'VERIFIED',
      id: 'NODE-DEV-320'
    },
    {
      title: 'AI Tools & Prompt Engineering',
      issuer: 'Generative AI Hub',
      status: 'VERIFIED',
      id: 'AI-PROM-606'
    }
  ];

  return (
    <section id="certifications" className="relative py-24 border-t border-white/5 bg-black/10">
      
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-neon-cyan/5 blur-[120px] rounded-full pointer-events-none" />

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
            Certifications & <span className="text-neon-cyan text-shadow-[0_0_15px_rgba(0,229,255,0.3)]">Credentials</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-neon-cyan mt-3 rounded-full shadow-[0_0_10px_#00E5FF]"
          />
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="glass-panel p-6 rounded-2xl border-white/5 flex flex-col justify-between items-start text-left group hover:border-neon-cyan/35 interactive-card relative overflow-hidden h-full"
            >
              {/* HUD grid background pattern */}
              <div className="absolute top-0 right-0 w-12 h-12 opacity-[0.03] dot-bg-overlay" />
              
              <div className="w-full">
                {/* Header tag */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-9 h-9 rounded-lg border border-neon-cyan/20 bg-neon-cyan/5 flex items-center justify-center text-lg text-neon-cyan">
                    <FiAward />
                  </div>
                  <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded border border-neon-cyan/20 bg-neon-cyan/5 font-mono text-[8px] font-bold text-neon-cyan uppercase">
                    <FiCheckCircle className="w-2.5 h-2.5" />
                    <span>{cert.status}</span>
                  </span>
                </div>

                {/* Certificate Title */}
                <h3 className="text-base md:text-lg font-heading font-extrabold text-white leading-tight mb-2 group-hover:text-neon-cyan transition-colors duration-300">
                  {cert.title}
                </h3>
                <span className="block font-body text-xs text-[var(--color-muted)] font-medium mb-4">
                  {cert.issuer}
                </span>
              </div>

              {/* Secure verification key HUD */}
              <div className="w-full pt-4 border-t border-white/5 flex justify-between items-center font-mono text-[9px] text-white/40">
                <span>VERIFY_KEY:</span>
                <span className="text-white/80 font-bold tracking-wider">{cert.id}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
