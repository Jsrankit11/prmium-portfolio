import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Dr. Ramesh Kumar',
      role: 'Head of BCA Department',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      comment: 'Ankit stands out as a highly logical developer. His academic project architecture for the Google Drive Clone demonstrated exceptional understanding of backend configurations and Spring Boot routing structures.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'Project Coordinator',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      comment: 'Working with Ankit during the development of our real-time messaging hub was a pleasure. He handled the WebSocket and Gemini API integration flawlessly, delivering a polished user experience.',
      rating: 5
    },
    {
      name: 'Aditya Vardhan',
      role: 'Senior Peer Developer',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      comment: 'Ankit possesses a great balance of Frontend visuals and Backend systems control. His prompt engineering techniques and speed in solving complex logical debugging bugs saved us massive development cycles.',
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="relative py-24 border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-neon-cyan/5 blur-[125px] rounded-full pointer-events-none" />

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
            Peer <span className="text-neon-cyan text-shadow-[0_0_15px_rgba(0,229,255,0.3)]">Reviews</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-neon-cyan mt-3 rounded-full shadow-[0_0_10px_#00E5FF]"
          />
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel p-7 rounded-2xl border-white/5 flex flex-col justify-between items-start text-left group hover:border-neon-cyan/35 interactive-card relative overflow-hidden h-full"
            >
              {/* Floating Quote Icon */}
              <div className="absolute -top-3 -right-3 text-neon-cyan/5 text-7xl font-black select-none pointer-events-none group-hover:text-neon-cyan/10 transition-colors duration-300">
                <FaQuoteLeft />
              </div>

              <div>
                {/* Stars rating row */}
                <div className="flex space-x-1 mb-5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500 text-xs drop-shadow-[0_0_5px_rgba(234,179,8,0.4)]" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="font-body text-sm text-[var(--color-muted)] leading-relaxed italic mb-6 relative z-10">
                  "{rev.comment}"
                </p>
              </div>

              {/* Reviewer Meta info */}
              <div className="flex items-center space-x-3.5 pt-4 border-t border-white/5 w-full">
                <img 
                  src={rev.image} 
                  alt={rev.name} 
                  className="w-10 h-10 rounded-full object-cover border border-neon-cyan/20 group-hover:border-neon-cyan/60 transition-all duration-300 shadow-[0_0_8px_rgba(0,229,255,0.1)]"
                />
                <div className="font-body">
                  <h4 className="text-sm font-extrabold text-white leading-tight">
                    {rev.name}
                  </h4>
                  <span className="text-[10px] font-mono text-neon-cyan/85 tracking-wider uppercase">
                    {rev.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
