import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { FaWhatsapp, FaLinkedinIn, FaGithub, FaInstagram } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ success: null, message: '' });

  const [formFields, setFormFields] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formFields.user_name || !formFields.user_email || !formFields.message) {
      setStatus({ success: false, message: 'Please fill in all mandatory fields (Name, Email, Message).' });
      return;
    }

    setLoading(true);
    setStatus({ success: null, message: '' });

    const SERVICE_ID = 'service_placeholder';
    const TEMPLATE_ID = 'template_placeholder';
    const PUBLIC_KEY = 'public_key_placeholder';

    if (SERVICE_ID === 'service_placeholder' || TEMPLATE_ID === 'template_placeholder' || PUBLIC_KEY === 'public_key_placeholder') {
      // Mocking submission
      setTimeout(() => {
        setLoading(false);
        setStatus({ 
          success: true, 
          message: 'Message simulation successful! (Please configure real EmailJS keys in src/components/Contact.jsx to receive emails).' 
        });
        setFormFields({ user_name: '', user_email: '', subject: '', message: '' });
      }, 1500);
      return;
    }

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setLoading(false);
        setStatus({ success: true, message: 'Message sent successfully! I will get back to you shortly.' });
        setFormFields({ user_name: '', user_email: '', subject: '', message: '' });
      })
      .catch((err) => {
        setLoading(false);
        setStatus({ success: false, message: `Failed to send message: ${err.text || 'Unknown Error'}` });
      });
  };

  const contactCards = [
    {
      icon: <FiMail className="text-neon-cyan" />,
      label: 'Email Address',
      value: 'ankitchaudhary8081039@gmail.com',
      action: 'mailto:ankitchaudhary8081039@gmail.com',
      actionLabel: 'Send email'
    },
    {
      icon: <FiPhone className="text-neon-cyan" />,
      label: 'Direct Phone',
      value: '+91 8081039242',
      action: 'tel:8081039242',
      actionLabel: 'Call now'
    },
    {
      icon: <FiMapPin className="text-neon-cyan" />,
      label: 'Location',
      value: 'Lucknow, India',
      action: 'https://maps.google.com/?q=Lucknow,India',
      actionLabel: 'Open map'
    }
  ];

  const socialLinks = [
    { icon: <FaLinkedinIn />, url: 'https://linkedin.com/in/ankit-chaudhary-b3555a322', color: 'hover:text-[#0077b5] hover:border-[#0077b5]/30' },
    { icon: <FaGithub />, url: 'https://github.com/jsrankit11', color: 'hover:text-[#ffffff] hover:border-[#ffffff]/30' },
    { icon: <FaInstagram />, url: 'https://instagram.com/index_ankit', color: 'hover:text-[#e1306c] hover:border-[#e1306c]/30' },
    { icon: <FaWhatsapp />, url: 'https://wa.me/918081039242', color: 'hover:text-[#25d366] hover:border-[#25d366]/30' },
  ];

  return (
    <section id="contact" className="relative py-24 border-t border-white/5">
      {/* Background ambient lighting */}
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
            {t('contact_title')} <span className="text-neon-cyan text-shadow-[0_0_15px_rgba(0,229,255,0.3)]">{t('contact_title_span')}</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-neon-cyan mt-3 rounded-full shadow-[0_0_10px_#00E5FF]"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* Left Column: Info Cards & Social Hub */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              {contactCards.map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="glass-panel p-5 rounded-2xl border-white/5 flex items-center space-x-5 hover:border-neon-cyan/25 interactive-card"
                >
                  <div className="w-11 h-11 rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 flex items-center justify-center text-xl shadow-[0_0_12px_rgba(0,229,255,0.05)]">
                    {card.icon}
                  </div>
                  <div className="text-left font-body flex-1">
                    <span className="block text-xs text-[var(--color-muted)] uppercase tracking-wider">{card.label}</span>
                    <a 
                      href={card.action} 
                      target={card.action.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-white/90 hover:text-neon-cyan transition-colors duration-200 break-all"
                    >
                      {card.value}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions (WhatsApp & Call) & Social links */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="glass-panel p-6 rounded-2xl border-white/5 text-left space-y-6"
            >
              <h3 className="text-xs font-heading font-extrabold text-white tracking-widest uppercase animate-pulse">
                {t('contact_lbl_quick')}
              </h3>
              
              <div className="grid grid-cols-2 gap-4.5">
                <a
                  href="https://wa.me/918081039242"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-450 hover:bg-emerald-500/10 hover:border-emerald-500/40 text-xs font-heading font-bold tracking-wider uppercase text-center flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-[1.03]"
                >
                  <FaWhatsapp className="text-base" />
                  <span>WHATSAPP</span>
                </a>
                <a
                  href="tel:8081039242"
                  className="py-3 px-4 rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan/40 text-xs font-heading font-bold tracking-wider uppercase text-center flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-[1.03]"
                >
                  <FiPhone />
                  <span>CALL DIRECT</span>
                </a>
              </div>

              {/* Social Channels row */}
              <div className="flex space-x-3 pt-2">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 rounded-lg border border-white/5 bg-white/5 flex items-center justify-center text-white/70 transition-all duration-300 ${social.color}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Email Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="glass-panel p-6 sm:p-8 rounded-2xl border-white/5 text-left h-full flex flex-col justify-between"
            >
              <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-5 flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="user_name" className="text-xs font-mono text-[var(--color-muted)] uppercase tracking-wider">
                      {t('contact_lbl_name')}
                    </label>
                    <input
                      type="text"
                      id="user_name"
                      name="user_name"
                      value={formFields.user_name}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Ankit Chaudhary"
                      className="px-4 py-3 rounded-xl border border-[var(--border-color)] bg-white/5 dark:bg-black/45 text-white placeholder-white/20 text-sm focus:border-neon-cyan focus:outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(0,229,255,0.1)]"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="user_email" className="text-xs font-mono text-[var(--color-muted)] uppercase tracking-wider">
                      {t('contact_lbl_email')}
                    </label>
                    <input
                      type="email"
                      id="user_email"
                      name="user_email"
                      value={formFields.user_email}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. client@domain.com"
                      className="px-4 py-3 rounded-xl border border-[var(--border-color)] bg-white/5 dark:bg-black/45 text-white placeholder-white/20 text-sm focus:border-neon-cyan focus:outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(0,229,255,0.1)]"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-mono text-[var(--color-muted)] uppercase tracking-wider">
                    {t('contact_lbl_subject')}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formFields.subject}
                    onChange={handleInputChange}
                    placeholder="Project consultation, query..."
                    className="px-4 py-3 rounded-xl border border-[var(--border-color)] bg-white/5 dark:bg-black/45 text-white placeholder-white/20 text-sm focus:border-neon-cyan focus:outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(0,229,255,0.1)]"
                  />
                </div>

                {/* Message Input */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="message" className="text-xs font-mono text-[var(--color-muted)] uppercase tracking-wider">
                    {t('contact_lbl_message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4.5"
                    value={formFields.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Tell me about your business goal or request..."
                    className="px-4 py-3 rounded-xl border border-[var(--border-color)] bg-white/5 dark:bg-black/45 text-white placeholder-white/20 text-sm focus:border-neon-cyan focus:outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(0,229,255,0.1)] resize-none"
                  />
                </div>

                {/* Status response */}
                {status.message && (
                  <div 
                    className={`p-3.5 rounded-xl border text-xs font-body leading-normal ${
                      status.success 
                        ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-450' 
                        : 'border-red-500/20 bg-red-500/5 text-red-455'
                    }`}
                  >
                    {status.message}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full relative px-6 py-4 rounded-xl font-heading text-xs font-bold tracking-wider text-black bg-neon-cyan shadow-[0_0_15px_rgba(0,229,255,0.2)] hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] transition-all duration-300 flex items-center justify-center space-x-2.5 group overflow-hidden disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:animate-[shine_1.5s_infinite]" />
                  <FiSend className="w-4 h-4" />
                  <span>{loading ? t('contact_btn_sending') : t('contact_btn_submit')}</span>
                </button>
              </form>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
