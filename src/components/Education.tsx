import React from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiActivity, FiAward } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';

export default function Education() {
  const { t, language } = useLanguage();

  const educationData = [
    {
      degree: {
        en: 'Bachelor of Computer Applications (BCA)',
        hi: 'बैचलर ऑफ कंप्यूटर एप्लीकेशन (बीसीए)'
      },
      institution: {
        en: 'Associated University College',
        hi: 'संबद्ध विश्वविद्यालय कॉलेज'
      },
      location: {
        en: 'Lucknow, Uttar Pradesh, India',
        hi: 'लखनऊ, उत्तर प्रदेश, भारत'
      },
      period: '2023 - 2026',
      score: {
        en: 'SGPA: 8.40 / 10.00',
        hi: 'एसजीपीए: 8.40 / 10.00'
      },
      highlights: {
        en: ['Overclocked academic performance in technical modules', 'Engineered lab projects using Java, Web Tech, and DBMS', 'Active participant in tech coding events'],
        hi: ['तकनीकी मॉड्यूल में बेहतरीन शैक्षणिक प्रदर्शन', 'जावा, वेब टेक और डीबीएमएस का उपयोग करके लैब प्रोजेक्ट तैयार किए', 'टेक कोडिंग इवेंट्स में सक्रिय भागीदार']
      }
    },
    {
      degree: {
        en: 'Higher Secondary School Certification (Class XII)',
        hi: 'उच्चतर माध्यमिक विद्यालय प्रमाणपत्र (कक्षा XII)'
      },
      institution: {
        en: 'Science Stream (PCM)',
        hi: 'विज्ञान संकाय (पीसीएम)'
      },
      location: {
        en: 'Lucknow, India',
        hi: 'लखनऊ, भारत'
      },
      period: '2021 - 2023',
      score: {
        en: 'First Division Honors',
        hi: 'प्रथम श्रेणी सम्मान'
      },
      highlights: {
        en: ['Focused on Advanced Mathematics, Physics, and Computer Science', 'Developed algorithmic problem-solving basics', 'Member of local cyber science club'],
        hi: ['उन्नत गणित, भौतिकी और कंप्यूटर विज्ञान पर ध्यान केंद्रित किया', 'एल्गोरिथम समस्या-समाधान बुनियादी बातें विकसित कीं', 'स्थानीय साइबर विज्ञान क्लब के सदस्य']
      }
    }
  ];

  return (
    <section id="education" className="relative py-24 border-t border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-heading font-extrabold text-white tracking-tight"
          >
            {t('edu_title')} <span className="text-neon-cyan text-shadow-[0_0_15px_rgba(0,229,255,0.3)]">{t('edu_title_span')}</span>
          </motion.h2>
          <div className="h-1 bg-neon-cyan mt-3 w-16 rounded-full shadow-[0_0_10px_#00E5FF]" />
        </div>

        {/* Timeline container */}
        <div className="relative border-l border-white/10 pl-6 md:pl-10 space-y-12 text-left max-w-3xl mx-auto py-4">
          
          {/* Vertical Glow Track overlay */}
          <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-blue-500 via-neon-cyan to-transparent pointer-events-none" />

          {educationData.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Pulsing Node Point */}
              <span className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-black border border-blue-500 flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.4)]">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              </span>

              {/* Education card */}
              <div className="glass-panel p-6 md:p-8 rounded-2xl border-white/5 hover:border-blue-500/25 interactive-card relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 opacity-[0.02] dot-bg-overlay" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-10 h-10 rounded-xl border border-blue-500/20 bg-blue-500/5 flex items-center justify-center text-lg text-blue-400">
                      <FiBookOpen />
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-heading font-extrabold text-white leading-tight">
                        {edu.degree[language]}
                      </h3>
                      <span className="text-xs font-mono font-semibold text-blue-400/80 uppercase tracking-widest block mt-0.5">
                        {edu.institution[language]} | {edu.location[language]}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                    <span className="px-3 py-1 rounded-full border border-white/5 bg-white/5 font-mono text-[10px] font-semibold text-white/70">
                      {edu.period}
                    </span>
                    <span className="px-3 py-1 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 font-mono text-[10px] font-semibold text-neon-cyan">
                      {edu.score[language]}
                    </span>
                  </div>
                </div>

                {/* Bullet Highlights */}
                <ul className="space-y-2 font-body text-xs text-[var(--color-muted)]">
                  {edu.highlights[language].map((hl, hIdx) => (
                    <li key={hIdx} className="flex items-start space-x-2.5">
                      <FiAward className="text-neon-cyan mt-0.5 shrink-0" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
