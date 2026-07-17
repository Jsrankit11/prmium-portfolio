import { useState, useRef, useEffect } from 'react';
import { FiVolume2, FiVolumeX, FiMusic } from 'react-icons/fi';

export default function AudioVisualizer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // We use a royalty-free synthwave stream loop
  const streamUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3';

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Playback blocked by browser autoplay policy:', err);
          // Try playing again or handle state
        });
    }
  };

  useEffect(() => {
    // Clean up audio on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="fixed bottom-24 left-6 z-40 flex items-center space-x-3">
      {/* Hidden audio element */}
      <audio 
        ref={audioRef} 
        src={streamUrl} 
        loop 
        preload="none"
      />

      {/* Main control button */}
      <button
        onClick={togglePlayback}
        className={`p-3.5 rounded-full border backdrop-blur-md transition-all duration-300 flex items-center justify-center relative group cursor-pointer ${
          isPlaying 
            ? 'border-neon-cyan/50 bg-neon-cyan/10 text-neon-cyan shadow-[0_0_20px_rgba(0,229,255,0.35)] hover:scale-105' 
            : 'border-white/10 bg-black/60 text-white/50 hover:text-neon-cyan hover:border-neon-cyan/30 hover:shadow-[0_0_15px_rgba(0,229,255,0.15)] hover:scale-105'
        }`}
        title={isPlaying ? 'Pause Ambient Stream' : 'Play Cyber Ambient Synth'}
      >
        {isPlaying ? (
          <FiVolume2 className="w-4.5 h-4.5 animate-pulse" />
        ) : (
          <FiVolumeX className="w-4.5 h-4.5" />
        )}
        
        {/* Pulsing ring */}
        {isPlaying && (
          <span className="absolute -inset-1 border border-neon-cyan/20 rounded-full blur-sm animate-ping pointer-events-none" />
        )}
      </button>

      {/* Visualizer and status bar */}
      <div 
        onClick={togglePlayback}
        className={`glass-panel px-4 py-2.5 rounded-2xl border-white/5 flex items-center space-x-3.5 cursor-pointer shadow-[0_0_25px_rgba(0,0,0,0.3)] transition-all duration-500 overflow-hidden max-w-[170px] sm:max-w-[210px] ${
          isPlaying 
            ? 'border-neon-cyan/25 translate-x-0 opacity-100' 
            : 'translate-x-[-10px] opacity-75 hover:opacity-100 hover:border-white/15'
        }`}
      >
        {/* Equalizer bars */}
        <div className="flex items-end space-x-[2.5px] h-4 w-7 shrink-0">
          {[
            { delay: '0.1s', height: 'h-2' },
            { delay: '0.4s', height: 'h-4' },
            { delay: '0.2s', height: 'h-3.5' },
            { delay: '0.6s', height: 'h-1.5' },
            { delay: '0.3s', height: 'h-3' },
          ].map((bar, idx) => (
            <span
              key={idx}
              className={`w-[3px] bg-neon-cyan rounded-full transition-all duration-300 origin-bottom ${
                isPlaying ? `${bar.height} animate-[pulse-neon_1.2s_infinite]` : 'h-1'
              }`}
              style={{
                animationDelay: isPlaying ? bar.delay : '0s',
                animationDuration: isPlaying ? '0.8s' : '0s',
                animationName: isPlaying ? 'float' : 'none'
              }}
            />
          ))}
        </div>

        {/* Text Details */}
        <div className="text-left font-mono select-none min-w-0">
          <span className="block text-[8px] text-white/40 uppercase tracking-widest leading-none mb-1">
            {isPlaying ? 'STREAM ACTIVE' : 'STREAM STANDBY'}
          </span>
          <span className="text-[10px] font-bold text-white/80 truncate block leading-none">
            {isPlaying ? 'Cyber_Ambient_Lofi.mp3' : 'Audio Offline'}
          </span>
        </div>
      </div>
    </div>
  );
}
