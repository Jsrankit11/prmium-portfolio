import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiTerminal, FiPlay, FiCpu } from 'react-icons/fi';

const ASCII_LOGO = `
    ███████╗██╗   ██╗████████╗██╗   ██╗██████╗ 
    ██╔════╝██║   ██║╚══██╔══╝██║   ██║██╔══██╗
    █████╗  ██║   ██║   ██║   ██║   ██║██████╔╝
    ██╔══╝  ██║   ██║   ██║   ██║   ██║██╔══██╗
    ██║     ╚██████╔╝   ██║   ╚██████╔╝██║  ██║
    ╚═╝      ╚═════╝    ╚═╝    ╚═════╝ ╚═╝  ╚═╝
             ANKIT CHAUDHARY // CORE PORTFOLIO
`;

export default function TerminalConsole() {
  const [history, setHistory] = useState([
    { type: 'system', content: 'SYSTEM BOOT SUCCESSFUL. FIRMWARE v4.1.0-STABLE' },
    { type: 'system', content: 'TYPE "help" TO SEE LIST OF DECRYPTED COMMANDS.' },
    { type: 'system', content: '' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [matrixActive, setMatrixActive] = useState(false);
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  const commandList = [
    { cmd: 'help', desc: 'Lists all available commands' },
    { cmd: 'about', desc: 'Displays Ankit\'s background' },
    { cmd: 'skills', desc: 'Prints technologies categorized' },
    { cmd: 'projects', desc: 'Lists featured software designs' },
    { cmd: 'neofetch', desc: 'Displays system specs and ASCII logo' },
    { cmd: 'matrix', desc: 'Loads cyber grid visualizer stream' },
    { cmd: 'contact', desc: 'Retrieves security contact endpoints' },
    { cmd: 'clear', desc: 'Purges terminal history' }
  ];

  const handleCommand = (cmdText) => {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;

    const newHistory = [...history, { type: 'input', content: `guest@ankit_portfolio:~$ ${cmdText}` }];

    switch (trimmed) {
      case 'help':
        newHistory.push({
          type: 'output',
          content: 'AVAILABLE SYSTEM ENGINES:\n' + 
            commandList.map(c => `  ${c.cmd.padEnd(12)} - ${c.desc}`).join('\n')
        });
        break;
      case 'about':
        newHistory.push({
          type: 'output',
          content: 'ANKIT CHAUDHARY // BCA GRADUATE (2026)\n----------------------------------------\n' +
            'I am a motivated and detail-oriented Full Stack Developer & Data Analytics.\n' +
            'I specialize in building interactive web apps using React, Node.js, and Spring Boot,\n' +
            'as well as writing optimized database architectures in MySQL and PostgreSQL.\n' +
            'Currently studying in Lucknow, India, maintaining an SGPA of 8.40.'
        });
        break;
      case 'skills':
        newHistory.push({
          type: 'output',
          content: 'DECRYPTED TECH STACKS:\n' +
            '  [FRONTEND]     React.js, Tailwind CSS, JS (ES6), HTML5/CSS3\n' +
            '  [BACKEND]      Node.js, Express.js, Spring Boot, Java, PHP\n' +
            '  [PROGRAMMING]  Python, C++, Java, C Core\n' +
            '  [DATABASES]    MySQL, MongoDB, PostgreSQL, Relational DBs\n' +
            '  [OTHER PROTO]  AWS Cloud, GitHub CI/CD, RESTful APIs, WebSockets, AI Prompting'
        });
        break;
      case 'projects':
        newHistory.push({
          type: 'output',
          content: 'FEATURED PROJECTS DIRECTORY:\n' +
            '  1. REAL-TIME AI CHAT APP\n' +
            '     Stack: Spring Boot, React, Gemini API, WebSockets\n' +
            '     Link: https://github.com/jsrankit11\n\n' +
            '  2. GOOGLE DRIVE CLONE\n' +
            '     Stack: Java Spring Boot, MySQL, REST API, React\n' +
            '     Link: https://github.com/jsrankit11'
        });
        break;
      case 'contact':
        newHistory.push({
          type: 'output',
          content: 'COMMUNICATION ENDPOINTS:\n' +
            '  EMAIL:      ankitchaudhary8081039@gmail.com\n' +
            '  PHONE:      +91 8081039242\n' +
            '  GITHUB:     https://github.com/jsrankit11\n' +
            '  LINKEDIN:   linkedin.com/in/ankit-chaudhary-b3555a322\n' +
            '  LOCATION:   Lucknow, Uttar Pradesh, India'
        });
        break;
      case 'socials':
        newHistory.push({
          type: 'output',
          content: 'SOCIAL SECURITY HANDLES:\n' +
            '  LinkedIn :  https://linkedin.com/in/ankit-chaudhary-b3555a322\n' +
            '  GitHub   :  https://github.com/jsrankit11\n' +
            '  Instagram:  https://instagram.com/index_ankit\n' +
            '  WhatsApp :  https://wa.me/918081039242'
        });
        break;
      case 'neofetch':
        newHistory.push({
          type: 'output',
          content: ASCII_LOGO + '\n' +
            'OS: Windows 11 x86_64\n' +
            'Host: Gemini-AI Virtual Shell\n' +
            'Kernel: React-19.2.6-Vite-8.0.12\n' +
            'Shell: bash-web-terminal\n' +
            'DE: Glassmorphism Dark Mode\n' +
            'WM: TailwindCSS v4.3.0 Engine\n' +
            'CPU: Human Brain Overclocked @ 4.80GHz\n' +
            'Memory: Coffee-Fueled / 16.0 GB\n' +
            'Design: Futuristic Sci-Fi HUD'
        });
        break;
      case 'matrix':
        setMatrixActive(true);
        newHistory.push({
          type: 'system',
          content: 'ESTABLISHING SECURE CONNECTION TERMINAL TO THE MATRIX...'
        });
        setTimeout(() => {
          setMatrixActive(false);
          setHistory(prev => [...prev, { type: 'output', content: 'CONNECTION INTERRUPTED. SYSTEM FIREWALL ACTIVE.' }]);
        }, 3000);
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      default:
        newHistory.push({
          type: 'error',
          content: `Command not found: "${trimmed}". Type "help" to review valid routines.`
        });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleCommand(inputVal);
  };

  const handleConsoleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    // Scroll console log to bottom
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  return (
    <section id="terminal" className="relative py-24 border-t border-white/5 bg-black/30">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-neon-cyan/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-white tracking-tight">
            Interactive <span className="text-neon-cyan text-shadow-[0_0_15px_rgba(0,229,255,0.3)]">Console</span>
          </h2>
          <div className="h-1 bg-neon-cyan mt-3 w-16 rounded-full shadow-[0_0_10px_#00E5FF]" />
        </div>

        {/* Terminal Container */}
        <div 
          onClick={handleConsoleClick}
          className="relative rounded-2xl border border-white/10 bg-black/75 shadow-[0_0_40px_rgba(0,0,0,0.6)] overflow-hidden font-mono text-xs text-left"
        >
          {/* Scanning Line overlay */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-20 opacity-70" />

          {/* Title bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10 select-none">
            <div className="flex space-x-1.5 items-center">
              <span className="w-3 h-3 rounded-full bg-red-500/60" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <span className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="text-white/40 font-bold ml-2 flex items-center space-x-1 text-[10px] tracking-wider uppercase">
                <FiTerminal className="w-3 h-3" />
                <span>SHELL: GUEST@ANKIT_SECURE_VM</span>
              </span>
            </div>
            <span className="text-[9px] text-neon-cyan/70 font-bold uppercase tracking-widest flex items-center space-x-1">
              <FiCpu className="animate-pulse" />
              <span>CORE_CONNECTED</span>
            </span>
          </div>

          {/* Terminal Screen Console logs */}
          <div className="p-5 h-[320px] overflow-y-auto space-y-2 select-text custom-scrollbar relative">
            {matrixActive ? (
              <div className="absolute inset-0 bg-black flex flex-col items-center justify-center text-green-500 text-center font-bold text-sm space-y-4">
                <div className="animate-pulse">LOADING DIGITAL MATRIX STREAM...</div>
                <div className="grid grid-cols-6 gap-2 text-xs opacity-80">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <span 
                      key={i} 
                      className="animate-bounce"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      {Math.random() > 0.5 ? '1' : '0'}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {history.map((log, idx) => (
              <div 
                key={idx} 
                className={`whitespace-pre-wrap ${
                  log.type === 'system' ? 'text-neon-cyan/60' :
                  log.type === 'input' ? 'text-white font-bold' :
                  log.type === 'error' ? 'text-red-400' : 'text-emerald-400/90'
                }`}
              >
                {log.content}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Input Form */}
          <form 
            onSubmit={handleFormSubmit}
            className="flex items-center px-5 py-3 border-t border-white/5 bg-white/5 relative z-10"
          >
            <span className="text-neon-cyan font-bold select-none mr-2 shrink-0">
              <span className="hidden sm:inline">guest@ankit_portfolio</span>
              <span className="sm:hidden">guest</span>:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder='Type "help" to start exploring...'
              className="bg-transparent border-none outline-none text-white w-full font-mono text-xs focus:ring-0 p-0 placeholder-white/20 select-text"
              autoComplete="off"
              autoCapitalize="off"
            />
            <button 
              type="submit" 
              className="text-neon-cyan/50 hover:text-neon-cyan transition-colors duration-200 shrink-0 p-1 ml-2 cursor-pointer"
            >
              <FiPlay className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Quick Commands (For Mobile Responsiveness) */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center select-none">
          <span className="text-[10px] text-white/40 uppercase font-mono tracking-wider flex items-center mr-1">Quick Macros:</span>
          {commandList.map((cmdObj) => (
            <button
              key={cmdObj.cmd}
              onClick={() => handleCommand(cmdObj.cmd)}
              className="px-3 py-1 rounded-md border border-white/5 bg-white/5 text-[10px] font-mono font-semibold text-white/60 hover:text-neon-cyan hover:border-neon-cyan/35 transition-all duration-300 cursor-pointer"
            >
              {cmdObj.cmd}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
