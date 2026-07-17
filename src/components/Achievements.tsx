import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiCpu, FiCode, FiZap } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';

export default function Achievements() {
  const { t, language } = useLanguage();

  const achievementsData = [
    {
      icon: <FiCode className="text-neon-cyan" />,
      title: {
        en: 'Over 500+ LeetCode & Coding Problems',
        hi: '500+ से अधिक LeetCode और कोडिंग समस्याएं'
      },
      description: {
        en: 'Successfully solved data structure challenges across arrays, strings, dynamic programming, and binary trees.',
        hi: 'सरणियों, स्ट्रिंग्स, डायनेमिक प्रोग्रामिंग और बाइनरी ट्री में डेटा संरचना चुनौतियों को सफलतापूर्वक हल किया।'
      },
      tag: 'CODING_CORE'
    },
    {
      icon: <FiZap className="text-blue-400" />,
      title: {
        en: 'Hackathon Sprint Lead',
        hi: 'हैकाथॉन स्प्रिंट लीड'
      },
      description: {
        en: 'Led a small developer pod to build a cloud file sharing dashboard mockup in under 36 hours during a collegiate sprint.',
        hi: 'एक कॉलेज स्प्रिंट के दौरान 36 घंटे से कम समय में क्लाउड फ़ाइल साझाकरण डैशबोर्ड मॉकअप बनाने के लिए एक छोटे डेवलपर पॉड का नेतृत्व किया।'
      },
      tag: 'LEADERSHIP'
    },
    {
      icon: <FiCpu className="text-indigo-400" />,
      title: {
        en: 'AI Agent Acceleration Badge',
        hi: 'एआई एजेंट एक्सेलेरेशन बैज'
      },
      description: {
        en: 'Earned recognition for implementing Gemini API structured response integrations inside full-stack prototypes.',
        hi: 'फुल-स्टैक प्रोटोटाइप के भीतर जेमिनी एपीआई संरचित प्रतिक्रिया एकीकरण को लागू करने के लिए मान्यता प्राप्त की।'
      },
      tag: 'AI_INTEGRATION'
    },
    {
      icon: <FiAward className="text-yellow-500" />,
      title: {
        en: 'Top Grade Technical Award',
        hi: 'शीर्ष श्रेणी तकनीकी पुरस्कार'
      },
      description: {
        en: 'Achieved academic recognition for maintaining an 8.40 SGPA and delivering clean database configurations in Java classes.',
        hi: '8.40 एसजीपीए बनाए रखने और जावा कक्षाओं में स्वच्छ डेटाबेस कॉन्फ़िगरेशन प्रदान करने के लिए शैक्षणिक मान्यता प्राप्त की।'
      },
      tag: 'ACADEMICS'
    }
  ];

  return (
    <section id="achievements" className="relative py-24 border-t border-white/5 bg-black/10">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-neon-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-heading font-extrabold text-white tracking-tight"
          >
            {t('ach_title')} <span className="text-neon-cyan text-shadow-[0_0_15px_rgba(0,229,255,0.3)]">{t('ach_title_span')}</span>
          </motion.h2>
          <div className="h-1 bg-neon-cyan mt-3 w-16 rounded-full shadow-[0_0_10px_#00E5FF]" />
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {achievementsData.map((ach, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel p-6 rounded-2xl border-white/5 flex items-start space-x-4.5 hover:border-neon-cyan/25 interactive-card relative overflow-hidden h-full text-left"
            >
              <div className="absolute top-0 right-0 w-12 h-12 opacity-[0.03] dot-bg-overlay" />
              
              {/* Left Column Icon */}
              <div className="w-11 h-11 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-xl shrink-0">
                {ach.icon}
              </div>

              {/* Detail Content */}
              <div className="flex-1 space-y-2 font-body">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[8px] font-bold text-neon-cyan uppercase tracking-widest border border-neon-cyan/20 bg-neon-cyan/5 px-2 py-0.5 rounded">
                    {ach.tag}
                  </span>
                </div>
                <h3 className="text-base font-heading font-extrabold text-white leading-tight">
                  {ach.title[language]}
                </h3>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  {ach.description[language]}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
