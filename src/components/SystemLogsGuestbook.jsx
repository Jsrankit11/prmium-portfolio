import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDatabase, FiBookOpen, FiEdit3, FiActivity } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';

export default function SystemLogsGuestbook() {
  const { t } = useLanguage();
  const [logs, setLogs] = useState([]);
  const [alias, setAlias] = useState('');
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('');

  const defaultLogs = [
    {
      id: 1,
      alias: 'Professor_RK',
      location: 'U.P.',
      message: 'Impressive stack integration. The interactive features on React 19 work beautifully.',
      timestamp: '2026-05-20 09:12'
    },
    {
      id: 2,
      alias: 'Priya_S',
      location: 'Delhi',
      message: 'Great portfolio design. The terminal console feels very organic and snappy!',
      timestamp: '2026-05-22 14:35'
    }
  ];

  useEffect(() => {
    const stored = localStorage.getItem('ankit_portfolio_logs');
    if (stored) {
      try {
        setLogs(JSON.parse(stored));
      } catch (err) {
        console.error('Error parsing stored logs:', err);
        setLogs(defaultLogs);
      }
    } else {
      setLogs(defaultLogs);
      localStorage.setItem('ankit_portfolio_logs', JSON.stringify(defaultLogs));
    }
  }, []);

  const handleLogSubmit = (e) => {
    e.preventDefault();
    if (!alias.trim() || !message.trim()) return;

    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

    const newEntry = {
      id: Date.now(),
      alias: alias.trim().replace(/\s+/g, '_'),
      location: location.trim() || 'REMOTE',
      message: message.trim(),
      timestamp: formattedDate
    };

    const updatedLogs = [newEntry, ...logs];
    setLogs(updatedLogs);
    localStorage.setItem('ankit_portfolio_logs', JSON.stringify(updatedLogs));

    setAlias('');
    setMessage('');
    setLocation('');
  };

  return (
    <section id="guestbook" className="relative py-24 border-t border-white/5 bg-black/10">
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-neon-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-white tracking-tight">
            {t('guest_title')} <span className="text-neon-cyan text-shadow-[0_0_15px_rgba(0,229,255,0.3)]">{t('guest_title_span')}</span>
          </h2>
          <p className="font-body text-xs text-[var(--color-muted)] mt-2 uppercase tracking-widest font-semibold">
            {t('guest_subtitle')}
          </p>
          <div className="h-1 bg-neon-cyan mt-3 w-16 rounded-full shadow-[0_0_10px_#00E5FF]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Write Log Panel */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border-white/5 text-left h-full flex flex-col justify-between">
              
              <div className="space-y-4">
                <h3 className="text-lg font-heading font-bold text-white mb-4 flex items-center space-x-2">
                  <FiEdit3 className="text-neon-cyan" />
                  <span>Register Node Entry</span>
                </h3>

                <form onSubmit={handleLogSubmit} className="space-y-4">
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="alias" className="text-xs font-mono text-[var(--color-muted)] uppercase tracking-wider">
                      {t('guest_lbl_alias')}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neon-cyan/60 font-mono text-sm">@</span>
                      <input
                        type="text"
                        id="alias"
                        value={alias}
                        onChange={(e) => setAlias(e.target.value)}
                        required
                        placeholder="e.g. Guest_User"
                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-[var(--border-color)] bg-white/5 dark:bg-black/40 text-white placeholder-white/20 text-sm focus:border-neon-cyan focus:outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(0,229,255,0.1)]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="location" className="text-xs font-mono text-[var(--color-muted)] uppercase tracking-wider">
                      {t('guest_lbl_location')}
                    </label>
                    <input
                      type="text"
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Lucknow, India"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-white/5 dark:bg-black/40 text-white placeholder-white/20 text-sm focus:border-neon-cyan focus:outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(0,229,255,0.1)]"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="log_message" className="text-xs font-mono text-[var(--color-muted)] uppercase tracking-wider">
                      {t('guest_lbl_message')}
                    </label>
                    <textarea
                      id="log_message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows="3"
                      placeholder="Write your connection log message..."
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-white/5 dark:bg-black/40 text-white placeholder-white/20 text-sm focus:border-neon-cyan focus:outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(0,229,255,0.1)] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full relative px-6 py-3.5 rounded-xl font-heading text-xs font-bold tracking-wider text-black bg-neon-cyan shadow-[0_0_15px_rgba(0,229,255,0.2)] hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] transition-all duration-300 flex items-center justify-center space-x-2.5 group overflow-hidden cursor-pointer"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shine_1.5s_infinite]" />
                    <FiDatabase />
                    <span>{t('guest_btn_broadcast')}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Ledger Listing */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="glass-panel p-6 rounded-2xl border-white/5 flex-1 flex flex-col justify-between overflow-hidden">
              
              <div className="w-full text-left">
                <h3 className="text-lg font-heading font-bold text-white mb-4.5 flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <FiBookOpen className="text-neon-cyan" />
                    <span>{t('guest_lbl_ledger')}</span>
                  </span>
                  <span className="text-[9px] font-mono text-white/30 tracking-widest flex items-center space-x-1.5 uppercase bg-white/5 px-2.5 py-1 rounded">
                    <FiActivity className="animate-pulse text-neon-cyan" />
                    <span>{t('guest_lbl_active')} {logs.length}</span>
                  </span>
                </h3>

                <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2 custom-scrollbar font-mono text-xs">
                  <AnimatePresence initial={false}>
                    {logs.length === 0 ? (
                      <div className="py-8 text-center text-white/30">
                        NO NODES CONNECTED. REGISTRY EMPTY.
                      </div>
                    ) : (
                      logs.map((log) => (
                        <motion.div
                          key={log.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.4 }}
                          className="p-4 rounded-xl border border-white/5 bg-white/5 hover:border-neon-cyan/20 transition-all duration-300 relative group"
                        >
                          <div className="flex justify-between items-center text-[10px] pb-2 border-b border-white/5 mb-2.5">
                            <span className="text-neon-cyan font-bold">
                              [LOG] NODE_@{log.alias}
                            </span>
                            <span className="text-white/30">
                              LOC: {log.location.toUpperCase()}
                            </span>
                          </div>
                          
                          <p className="text-white/80 font-body leading-relaxed mb-2 text-left">
                            "{log.message}"
                          </p>

                          <div className="text-[8px] text-white/30 text-right font-mono">
                            TIMESTAMP: {log.timestamp}
                          </div>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
