import { FaLinkedinIn, FaGithub, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Services', href: '#services' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: <FaLinkedinIn />, url: 'https://linkedin.com/in/ankit-chaudhary-b3555a322', color: 'hover:text-[#0077b5] hover:border-[#0077b5]/30' },
    { icon: <FaGithub />, url: 'https://github.com/jsrankit11', color: 'hover:text-[#ffffff] hover:border-[#ffffff]/30' },
    { icon: <FaInstagram />, url: 'https://instagram.com/instaholic_ankit', color: 'hover:text-[#e1306c] hover:border-[#e1306c]/30' },
    { icon: <FaWhatsapp />, url: 'https://wa.me/918081039242', color: 'hover:text-[#25d366] hover:border-[#25d366]/30' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const targetSection = document.querySelector(href);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="relative bg-black/40 border-t border-white/5 pt-16 pb-8 overflow-hidden">
      
      {/* Top glowing neon divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent shadow-[0_0_8px_rgba(0,229,255,0.4)]" />
      
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-28 bg-neon-cyan/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/5">
          {/* Brand Monogram */}
          <div className="text-center md:text-left">
            <a 
              href="#home" 
              onClick={(e) => handleLinkClick(e, '#home')}
              className="text-xl font-heading font-black tracking-tight text-white inline-block mb-3"
            >
              ANKIT<span className="text-neon-cyan">.</span>
            </a>
            <p className="font-body text-xs text-[var(--color-muted)] max-w-xs leading-relaxed">
              Full Stack Developer & Data Analytics. Creating digital experiences for a web-centric future.
            </p>
          </div>

          {/* Quick Menu */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 font-ui text-xs font-semibold text-[var(--color-muted)] max-w-md">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="hover:text-neon-cyan transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Social connections */}
          <div className="flex space-x-3.5">
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
        </div>

        {/* Legal and dev attribution */}
        <div className="w-full pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] text-white/40">
          <div className="text-center md:text-left">
            © {currentYear} ANKIT CHAUDHARY. ALL RIGHTS RESERVED.
          </div>
          <div className="text-center md:text-right">
            DESIGNED & DEVELOPED BY <span className="text-neon-cyan font-bold tracking-widest text-shadow-[0_0_5px_rgba(0,229,255,0.2)]">ANKIT CHAUDHARY</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
