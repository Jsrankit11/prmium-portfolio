import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi';

interface TranslationDict {
  [key: string]: {
    en: string;
    hi: string;
  };
}

const translations: TranslationDict = {
  // Navigation
  nav_home: { en: 'Home', hi: 'मुख्य पृष्ठ' },
  nav_about: { en: 'About', hi: 'मेरे बारे में' },
  nav_skills: { en: 'Skills', hi: 'कौशल' },
  nav_projects: { en: 'Projects', hi: 'परियोजनाएं' },
  nav_experience: { en: 'Experience', hi: 'अनुभव' },
  nav_console: { en: 'Console', hi: 'कंसोल' },
  nav_services: { en: 'Services', hi: 'सेवाएं' },
  nav_reviews: { en: 'Reviews', hi: 'समीक्षाएं' },
  nav_credentials: { en: 'Credentials', hi: 'प्रमाणपत्र' },
  nav_guestbook: { en: 'Guestbook', hi: 'गेस्टबुक' },
  nav_contact: { en: 'Contact', hi: 'संपर्क' },
  nav_hire_me: { en: 'HIRE ME', hi: 'हायर करें' },

  // Hero Section
  hero_welcome: { en: 'WELCOME TO THE FUTURE OF DEVELOPMENT', hi: 'विकास के भविष्य में आपका स्वागत है' },
  hero_title_dev: { en: 'Full Stack Developer', hi: 'फुल स्टैक डेवलपर' },
  hero_title_data: { en: '& Data Analytics', hi: 'और डेटा विश्लेषक' },
  hero_sub: { en: 'I build scalable web applications, modern UI/UX experiences, and intelligent AI-powered solutions.', hi: 'मैं स्केलेबल वेब एप्लिकेशन, आधुनिक UI/UX अनुभव और बुद्धिमान AI-संचालित समाधान बनाता हूँ।' },
  hero_btn_resume: { en: 'DOWNLOAD RESUME', hi: 'रिज्यूमे डाउनलोड करें' },
  hero_btn_contact: { en: 'CONTACT ME', hi: 'मुझसे संपर्क करें' },
  hero_status_active: { en: 'SYS.STATUS: ACTIVE', hi: 'सिस्टम स्थिति: सक्रिय' },
  hero_ssh_connected: { en: 'CONNECTED', hi: 'कनेक्टेड' },

  // About Section
  about_title: { en: 'About', hi: 'मेरे' },
  about_title_span: { en: 'Me', hi: 'बारे में' },
  about_formal_proto: { en: 'FORMAL_PROTOCOL', hi: 'औपचारिक_प्रोटोकॉल' },
  about_creative_proto: { en: 'CREATIVE_PROTOCOL', hi: 'रचनात्मक_प्रोटोकॉल' },
  about_exec_summary: { en: 'Executive Summary', hi: 'कार्यकारी सारांश' },
  about_creative_philosophy: { en: 'Creative Philosophy', hi: 'रचनात्मक दर्शन' },
  about_formal_bio: {
    en: 'Motivated and detail-oriented BCA student with a strong interest in Frontend, Backend, Full Stack Development, AI Tools, and Technical Problem Solving. I enjoy building sleek web interfaces, engineering reliable server architectures, and analyzing data patterns to extract actionable insights.',
    hi: 'फ्रंटएंड, बैकएंड, फुल स्टैक डेवलपमेंट, एआई टूल्स और तकनीकी समस्या समाधान में गहरी रुचि रखने वाला प्रेरित और विवरण-उन्मुख बीसीए छात्र। मुझे आकर्षक वेब इंटरफेस बनाना, विश्वसनीय सर्वर आर्किटेक्चर तैयार करना और कार्रवाई योग्य अंतर्दृष्टि निकालने के लिए डेटा पैटर्न का विश्लेषण करना पसंद है।'
  },
  about_creative_bio: {
    en: 'Passionate about creating modern, engaging visual designs and exploring generative AI tools. I experiment with responsive CSS layouts, fine-tune prompt strategies, and enjoy customizing developer environments. I believe coding is both a science of logic and an art of visual expressions.',
    hi: 'आधुनिक, आकर्षक दृश्य डिज़ाइन बनाने और जनरेटिव एआई टूल की खोज के प्रति जुनूनी। मैं रिस्पॉन्सिव सीएसएस लेआउट का प्रयोग करता हूं, प्रॉम्प्ट रणनीतियों को ठीक करता हूं, और डेवलपर वातावरण को अनुकूलित करने का आनंद लेता हूं। मेरा मानना है कि कोडिंग तर्क का विज्ञान और दृश्य अभिव्यक्तियों की कला दोनों है।'
  },
  about_clearance: { en: 'SYS_CLEARANCE_SECURE', hi: 'सिस्टम_निकासी_सुरक्षित' },
  about_vibe_active: { en: 'CREATIVE_VIBE_ACTIVE', hi: 'रचनात्मक_वाइब_सक्रिय' },

  // About Details Cards
  about_lbl_name: { en: 'Name', hi: 'नाम' },
  about_lbl_location: { en: 'Location', hi: 'स्थान' },
  about_lbl_degree: { en: 'Degree', hi: 'डिग्री' },
  about_lbl_degree_val: { en: 'BCA (Graduating 2026)', hi: 'बीसीए (स्नातक 2026)' },
  about_lbl_sgpa: { en: 'Academic SGPA', hi: 'शैक्षणिक एसजीपीए' },
  about_lbl_languages: { en: 'Languages', hi: 'भाषाएँ' },
  about_lbl_languages_val: { en: 'English, Hindi', hi: 'अंग्रेजी, हिंदी' },
  about_lbl_vibe: { en: 'Vibe Check', hi: 'वाइब चेक' },
  about_lbl_vibe_val: { en: 'Tech Enthusiast', hi: 'तकनीकी उत्साही' },
  about_lbl_focus: { en: 'Focus Area', hi: 'फोकस क्षेत्र' },
  about_lbl_focus_val: { en: 'Modern UI/UX & AI Prompting', hi: 'आधुनिक यूआई/यूएक्स और एआई प्रॉम्प्टिंग' },
  about_lbl_design: { en: 'Design Style', hi: 'डिजाइन शैली' },
  about_lbl_design_val: { en: 'Cyberpunk & Glassmorphic', hi: 'साइबरपंक और ग्लासमॉर्फिक' },
  about_lbl_status: { en: 'Status', hi: 'स्थिति' },
  about_lbl_status_val: { en: 'Seeking Internships', hi: 'इंटर्नशिप की तलाश में' },

  // Stats Counters
  about_stat_tech: { en: 'Technologies Mastered', hi: 'मास्टर्ड प्रौद्योगिकियां' },
  about_stat_cert: { en: 'Certifications Completed', hi: 'पूर्ण प्रमाणपत्र' },
  about_stat_proj: { en: 'Projects Built', hi: 'बनाई गई परियोजनाएं' },
  about_stat_resp: { en: 'Responsive Layouts', hi: 'रिस्पॉन्सिव लेआउट' },
  about_stat_prompts: { en: 'AI Prompts Structured', hi: 'एआई प्रॉम्प्ट संरचित' },
  about_stat_hobbies: { en: 'Creative Hobbies', hi: 'रचनात्मक शौक' },
  about_stat_aesthetics: { en: 'Visual Aesthetics', hi: 'दृश्य सौंदर्यशास्त्र' },
  about_stat_tweaks: { en: 'Hours of UI Tweak', hi: 'यूआई ट्यूनिंग के घंटे' },

  // Skills Section
  skills_title: { en: 'My', hi: 'मेरे' },
  skills_title_span: { en: 'Skills', hi: 'कौशल' },
  skills_tab_all: { en: 'All Skills', hi: 'सभी कौशल' },
  skills_tab_frontend: { en: 'Frontend', hi: 'फ्रंटएंड' },
  skills_tab_backend: { en: 'Backend', hi: 'बैकएंड' },
  skills_tab_programming: { en: 'Programming', hi: 'प्रोग्रामिंग' },
  skills_tab_database: { en: 'Database', hi: 'डेटाबेस' },
  skills_tab_other: { en: 'Tools & Concepts', hi: 'टूल्स और अवधारणाएं' },
  skills_tab_soft: { en: 'Soft Skills', hi: 'सॉफ्ट स्किल्स' },

  // Projects Section
  proj_title: { en: 'Featured', hi: 'विशेष' },
  proj_title_span: { en: 'Projects', hi: 'परियोजनाएं' },
  proj_btn_source: { en: 'SOURCE CODE', hi: 'सोर्स कोड' },
  proj_btn_demo: { en: 'LIVE DEMO', hi: 'लाइव डेमो' },

  // Experience Section
  exp_title: { en: 'Internship & Academic', hi: 'इंटर्नशिप और शैक्षणिक' },
  exp_title_span: { en: 'Experience', hi: 'अनुभव' },
  exp_heading_resp: { en: 'CORE RESPONSIBILITIES:', hi: 'मुख्य जिम्मेदारियां:' },

  // Education Section
  edu_title: { en: 'Education', hi: 'शिक्षा' },
  edu_title_span: { en: 'History', hi: 'इतिहास' },

  // Achievements Section
  ach_title: { en: 'Key', hi: 'प्रमुख' },
  ach_title_span: { en: 'Achievements', hi: 'उपलब्धियां' },

  // Services Section
  serv_title: { en: 'My', hi: 'मेरी' },
  serv_title_span: { en: 'Services', hi: 'सेवाएं' },

  // Testimonials Section
  test_title: { en: 'Client & Peer', hi: 'क्लाइंट और सहकर्मी' },
  test_title_span: { en: 'Reviews', hi: 'समीक्षाएं' },

  // Certifications Section
  cert_title: { en: 'Certifications &', hi: 'प्रमाणपत्र और' },
  cert_title_span: { en: 'Credentials', hi: 'योग्यताएं' },

  // Guestbook Section
  guest_title: { en: 'Decentralized', hi: 'विकेंद्रीकृत' },
  guest_title_span: { en: 'Logs', hi: 'लॉग्स' },
  guest_subtitle: { en: 'SECURE VISITOR REGISTRY LEDGER', hi: 'सुरक्षित विज़िटर रजिस्ट्री बहीखाता' },
  guest_lbl_alias: { en: 'Node Alias / Handle *', hi: 'नोड उपनाम / हैंडल *' },
  guest_lbl_location: { en: 'Location / Region', hi: 'स्थान / क्षेत्र' },
  guest_lbl_message: { en: 'Registry Log Message *', hi: 'रजिस्ट्री लॉग संदेश *' },
  guest_btn_broadcast: { en: 'BROADCAST ENTRY', hi: 'ब्रॉडकास्ट प्रविष्टि' },
  guest_lbl_ledger: { en: 'Node Registry Ledger', hi: 'नोड रजिस्ट्री बहीखाता' },
  guest_lbl_active: { en: 'Active Entries:', hi: 'सक्रिय प्रविष्टियां:' },

  // Contact Section
  contact_title: { en: 'Get In', hi: 'संपर्क' },
  contact_title_span: { en: 'Touch', hi: 'करें' },
  contact_lbl_name: { en: 'Your Name *', hi: 'आपका नाम *' },
  contact_lbl_email: { en: 'Your Email *', hi: 'आपका ईमेल *' },
  contact_lbl_subject: { en: 'Subject', hi: 'विषय' },
  contact_lbl_message: { en: 'Message Details *', hi: 'संदेश विवरण *' },
  contact_btn_submit: { en: 'TRANSMIT MESSAGE', hi: 'संदेश प्रेषित करें' },
  contact_btn_sending: { en: 'TRANSMITTING...', hi: 'प्रेषित किया जा रहा है...' },
  contact_lbl_quick: { en: 'QUICK COMMUNICATIONS:', hi: 'त्वरित संचार:' },

  // AI Chatbot
  bot_title: { en: 'AI Assistant Core', hi: 'एआई सहायक कोर' },
  bot_welcome: { en: 'Hello! I am Ankit\'s AI Portfolio Assistant. How can I help you today?', hi: 'नमस्ते! मैं अंकित का एआई पोर्टफोलियो सहायक हूँ। मैं आज आपकी क्या मदद कर सकता हूँ?' },
  bot_placeholder: { en: 'Ask me about Ankit\'s stack, experience, etc...', hi: 'अंकित के कौशल, अनुभव आदि के बारे में पूछें...' },
  bot_quick_1: { en: 'What is Ankit\'s tech stack?', hi: 'अंकित का टेक स्टैक क्या है?' },
  bot_quick_2: { en: 'Tell me about his projects.', hi: 'उनके प्रोजेक्ट्स के बारे में बताएं।' },
  bot_quick_3: { en: 'How can I contact Ankit?', hi: 'मैं अंकित से कैसे संपर्क करूं?' }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('ankit_portfolio_lang') as Language;
    if (savedLang === 'en' || savedLang === 'hi') {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('ankit_portfolio_lang', lang);
  };

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language] || translations[key]['en'] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
