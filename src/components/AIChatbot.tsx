import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend, FiCpu, FiUser } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

export default function AIChatbot() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize chatbot welcome message when language changes
  useEffect(() => {
    setMessages([
      {
        sender: 'bot',
        text: t('bot_welcome')
      }
    ]);
  }, [language]);

  // Scroll to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Knowledge base mappings (English & Hindi)
  const knowledgeBase = {
    stack: {
      en: "Ankit Chaudhary's tech stack includes:\n• Frontend: React 19, Tailwind CSS 4, HTML5/CSS3, JavaScript (ES6).\n• Backend: Node.js, Express.js, Java Spring Boot, PHP.\n• Databases: MySQL, MongoDB, PostgreSQL.\n• Other: AWS Cloud, WebSockets, REST APIs, AI Prompt Engineering, GitHub CI/CD.",
      hi: "अंकित चौधरी के तकनीकी कौशल में शामिल हैं:\n• फ्रंटएंड: रिएक्ट 19, टेलविंड सीएसएस 4, एचटीएमएल5/सीएसएस3, जावास्क्रिप्ट (ईएस6)।\n• बैकएंड: नोड.जेएस, एक्सप्रेस.जेएस, जावा स्प्रिंग बूट, पीएचपी।\n• डेटाबेस: माईएसक्यूएल, मोंगोडीबी, पोस्टग्रेएसक्यूएल।\n• अन्य: एडब्ल्यूएस क्लाउड, वेबसॉकेट, रेस्ट एपीआई, एआई प्रॉम्प्ट इंजीनियरिंग, गिटहब सीआई/सीडी।"
    },
    projects: {
      en: "Featured Projects by Ankit:\n1. Real-time AI Chat App: Powered by Spring Boot, React, Gemini AI API, and WebSockets for real-time discussions.\n2. Google Drive Clone: Cloud file storage with file/folder operations, secure authentication, built on Spring Boot & MySQL.",
      hi: "अंकित की विशेष परियोजनाएं:\n1. रियल-टाइम एआई चैट ऐप: रीयल-टाइम चर्चाओं के लिए स्प्रिंग बूट, रिएक्ट, जेमिनी एआई एपीआई और वेबसॉकेट्स द्वारा संचालित।\n2. गूगल ड्राइव क्लोन: स्प्रिंग बूट और माईएसक्यूएल पर निर्मित फ़ाइल/फ़ोल्डर संचालन, सुरक्षित प्रमाणीकरण के साथ क्लाउड फ़ाइल स्टोरेज।"
    },
    contact: {
      en: "You can reach Ankit via:\n• Email: ankitchaudhary8081039@gmail.com\n• Phone: +91 8081039242\n• GitHub: github.com/jsrankit11\n• LinkedIn: linkedin.com/in/ankit-chaudhary-b3555a322",
      hi: "आप अंकित से निम्न माध्यमों से संपर्क कर सकते हैं:\n• ईमेल: ankitchaudhary8081039@gmail.com\n• फोन: +91 8081039242\n• गिटहब: github.com/jsrankit11\n• लिंक्डइन: linkedin.com/in/ankit-chaudhary-b3555a322"
    },
    education: {
      en: "Ankit Chaudhary is graduating in Bachelor of Computer Applications (BCA) in 2026 from Lucknow, India. He currently maintains a strong academic SGPA of 8.40 / 10.",
      hi: "अंकित चौधरी 2026 में लखनऊ, भारत से बैचलर ऑफ कंप्यूटर एप्लीकेशन (बीसीए) में स्नातक कर रहे हैं। वर्तमान में वह 8.40 / 10 का मजबूत शैक्षणिक एसजीपीए बनाए हुए हैं।"
    },
    certifications: {
      en: "Ankit holds several certifications:\n• AWS Certified Cloud Practitioner\n• Python Programming Certification\n• Node.js Backend Development\n• GCP Training Certification\n• AI Tools & Prompt Engineering Hub Certification",
      hi: "अंकित के पास कई प्रमाणपत्र हैं:\n• एडब्ल्यूएस प्रमाणित क्लाउड प्रैक्टिशनर\n• पायथन प्रोग्रामिंग प्रमाणपत्र\n• नोड.जेएस बैकएंड डेवलपमेंट\n• जीसीपी प्रशिक्षण प्रमाणपत्र\n• एआई टूल्स और प्रॉम्प्ट इंजीनियरिंग हब प्रमाणपत्र"
    },
    default: {
      en: "I'm a localized model specialized in Ankit's credentials. You can ask about his 'skills', 'projects', 'education', 'certifications', or 'contact' information!",
      hi: "मैं अंकित की साख के बारे में बताने के लिए तैयार एक एआई सहायक हूँ। आप उनके 'कौशल', 'प्रोजेक्ट्स', 'शिक्षा', 'प्रमाणपत्र' या 'संपर्क' के बारे में पूछ सकते हैं!"
    }
  };

  const getBotResponse = (userQuery: string): string => {
    const q = userQuery.toLowerCase();
    
    if (q.includes('skill') || q.includes('stack') || q.includes('technolog') || q.includes('language') || q.includes('कौशल') || q.includes('तकनीक')) {
      return knowledgeBase.stack[language];
    }
    if (q.includes('project') || q.includes('code') || q.includes('work') || q.includes('प्रोजेक्ट') || q.includes('काम')) {
      return knowledgeBase.projects[language];
    }
    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('hire') || q.includes('संपर्क') || q.includes('ईमेल') || q.includes('फोन')) {
      return knowledgeBase.contact[language];
    }
    if (q.includes('education') || q.includes('bca') || q.includes('college') || q.includes('school') || q.includes('अध्ययन') || q.includes('शिक्षा') || q.includes('पढ़ाई')) {
      return knowledgeBase.education[language];
    }
    if (q.includes('certificat') || q.includes('credential') || q.includes('aws') || q.includes('प्रमाणपत्र')) {
      return knowledgeBase.certifications[language];
    }
    return knowledgeBase.default[language];
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const updatedMessages = [...messages, { sender: 'user', text }];
    setMessages(updatedMessages);
    setInputVal('');
    setIsTyping(true);

    // Simulate AI thinking and reply
    setTimeout(() => {
      setIsTyping(false);
      const reply = getBotResponse(text);
      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 1000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputVal);
  };

  const quickReplies = [
    { text: t('bot_quick_1'), query: 'stack' },
    { text: t('bot_quick_2'), query: 'projects' },
    { text: t('bot_quick_3'), query: 'contact' }
  ];

  return (
    <div className={`fixed bottom-6 left-6 font-ui text-xs transition-all duration-300 ${isOpen ? 'z-48' : 'z-40'}`}>
      
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 rounded-full border border-neon-cyan/40 bg-black/80 backdrop-blur-md text-neon-cyan shadow-[0_0_15px_rgba(0,229,255,0.25)] hover:border-neon-cyan hover:shadow-[0_0_20px_rgba(0,229,255,0.5)] transition-all duration-300 relative group cursor-pointer"
        title="AI Assistant"
      >
        <span className="absolute -inset-1 border border-neon-cyan/20 rounded-full blur-sm group-hover:animate-pulse" />
        {isOpen ? <FiX className="w-5 h-5" /> : <FiMessageSquare className="w-5 h-5" />}
      </motion.button>

      {/* Expandable Chat Console */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 50 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 260, damping: 20 }}
            className="absolute bottom-16 -left-3 sm:left-0 w-[calc(100vw-24px)] sm:w-[360px] h-[400px] sm:h-[480px] rounded-2xl border border-white/10 bg-black/90 backdrop-blur-lg shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-between"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-4.5 py-3.5 bg-white/5 border-b border-white/10 select-none">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-lg border border-neon-cyan/30 bg-neon-cyan/5 flex items-center justify-center text-neon-cyan shadow-[0_0_8px_rgba(0,229,255,0.15)]">
                  <FiCpu className="w-3.5 h-3.5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-white font-heading font-extrabold tracking-wide uppercase text-[10px] text-left leading-tight">
                    {t('bot_title')}
                  </h4>
                  <span className="text-[8px] font-mono text-neon-cyan uppercase tracking-widest block text-left">
                    ONLINE // SECURE_AI
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 p-4.5 overflow-y-auto space-y-3.5 custom-scrollbar text-left font-body">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-start space-x-2.5 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
                >
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                    msg.sender === 'user' 
                      ? 'border-blue-500/20 bg-blue-500/5 text-blue-400' 
                      : 'border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan'
                  }`}>
                    {msg.sender === 'user' ? <FiUser className="w-3 h-3" /> : <FiCpu className="w-3 h-3" />}
                  </div>
                  <div className={`px-3 py-2 rounded-xl text-[11px] leading-relaxed max-w-[75%] whitespace-pre-wrap border ${
                    msg.sender === 'user'
                      ? 'bg-blue-500/10 border-blue-500/20 text-white rounded-tr-none'
                      : 'glass-panel border-white/5 text-white/90 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start space-x-2.5">
                  <div className="w-6 h-6 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan flex items-center justify-center shrink-0">
                    <FiCpu className="w-3 h-3 animate-spin" />
                  </div>
                  <div className="px-3 py-2 rounded-xl text-[11px] glass-panel border-white/5 text-neon-cyan rounded-tl-none font-mono flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick replies panel */}
            {messages.length === 1 && !isTyping && (
              <div className="px-4.5 pb-2.5 flex flex-col space-y-1.5">
                {quickReplies.map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(reply.query)}
                    className="w-full text-left py-2 px-3 rounded-lg border border-white/5 bg-white/5 text-[10px] text-white/60 hover:text-neon-cyan hover:border-neon-cyan/20 transition-all duration-300 cursor-pointer hover:bg-neon-cyan/5"
                  >
                    {reply.text}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form 
              onSubmit={handleFormSubmit}
              className="flex items-center px-4.5 py-3 border-t border-white/5 bg-white/5 relative z-10"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={t('bot_placeholder')}
                className="bg-transparent border-none outline-none text-white w-full text-[11px] focus:ring-0 p-0 placeholder-white/20"
              />
              <button 
                type="submit" 
                className="text-neon-cyan/60 hover:text-neon-cyan transition-colors duration-200 shrink-0 p-1.5 ml-2 cursor-pointer border border-neon-cyan/15 hover:border-neon-cyan rounded-lg bg-neon-cyan/5 hover:bg-neon-cyan/10"
              >
                <FiSend className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
