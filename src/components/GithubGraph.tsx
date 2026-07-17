import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGitCommit, FiTrendingUp, FiActivity } from 'react-icons/fi';

export default function GithubGraph() {
  // Generate mock contribution grid data (53 weeks * 7 days = 371 days)
  // 0: no commits, 1: 1-2 commits, 2: 3-5 commits, 3: 6-8 commits, 4: 9+ commits
  const [hoveredDay, setHoveredDay] = useState<{ count: number; date: string } | null>(null);

  // Generate 53 columns, each containing 7 cells
  const generateGridData = () => {
    const data: number[][] = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let w = 0; w < 52; w++) {
      const week: number[] = [];
      for (let d = 0; d < 7; d++) {
        // Generate realistic clustered committing patterns
        const randVal = Math.random();
        let activity = 0;
        if (randVal > 0.85) activity = 4;
        else if (randVal > 0.65) activity = 3;
        else if (randVal > 0.4) activity = 2;
        else if (randVal > 0.15) activity = 1;
        // Weekends have slightly lower commits
        if (d === 0 || d === 6) {
          activity = Math.max(0, activity - 2);
        }
        week.push(activity);
      }
      data.push(week);
    }
    return data;
  };

  const gridData = generateGridData();

  // Color mappings matching cyberpunk blue/cyan theme
  const getIntensityColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-cyan-950/40 border border-cyan-900/30';
      case 2: return 'bg-cyan-800/60 border border-cyan-700/40';
      case 3: return 'bg-cyan-500/80 shadow-[0_0_8px_rgba(6,182,212,0.25)] border border-cyan-400/40';
      case 4: return 'bg-neon-cyan shadow-[0_0_12px_#00E5FF] border border-cyan-300/60';
      default: return 'bg-white/5 border border-white/5';
    }
  };

  const getCommitCount = (level: number) => {
    switch (level) {
      case 1: return 2;
      case 2: return 5;
      case 3: return 8;
      case 4: return 14;
      default: return 0;
    }
  };

  const getMockDate = (weekIdx: number, dayIdx: number) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const totalDaysOffset = (weekIdx * 7) + dayIdx;
    const date = new Date(new Date().getFullYear(), 0, 1 + totalDaysOffset);
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl border-white/5 w-full text-left font-mono relative overflow-hidden mt-6 shadow-[0_0_30px_rgba(0,0,0,0.15)]">
      {/* HUD Backdrop grids */}
      <div className="absolute top-0 right-0 w-16 h-16 opacity-[0.03] dot-bg-overlay" />
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4.5 pb-5 border-b border-white/5 mb-6">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 flex items-center justify-center text-lg text-neon-cyan shadow-[0_0_10px_rgba(0,229,255,0.08)]">
            <FiActivity />
          </div>
          <div>
            <h3 className="text-sm font-heading font-extrabold text-white uppercase tracking-wider leading-tight">
              GitHub Engine Metrics
            </h3>
            <span className="text-[10px] text-neon-cyan tracking-widest block uppercase mt-0.5">
              Source: github.com/jsrankit11
            </span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex gap-4 text-[10px] text-white/80">
          <div className="bg-white/5 border border-white/5 px-3 py-1.5 rounded-lg">
            <span className="block text-white/40 text-[8px] uppercase">TOTAL CONTRIBUTIONS</span>
            <span className="text-neon-cyan font-bold text-xs flex items-center gap-1 mt-0.5">
              <FiGitCommit />
              <span>1,248 Commits</span>
            </span>
          </div>
          <div className="bg-white/5 border border-white/5 px-3 py-1.5 rounded-lg">
            <span className="block text-white/40 text-[8px] uppercase">LONGEST STREAK</span>
            <span className="text-emerald-450 font-bold text-xs flex items-center gap-1 mt-0.5">
              <FiTrendingUp />
              <span>45 Days</span>
            </span>
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="w-full overflow-x-auto custom-scrollbar pb-3 relative">
        <div className="min-w-[620px] flex flex-col space-y-1">
          
          {/* Calendar boxes */}
          <div className="flex gap-1">
            {gridData.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1">
                {week.map((level, dIdx) => (
                  <div
                    key={dIdx}
                    onMouseEnter={() => setHoveredDay({
                      count: getCommitCount(level),
                      date: getMockDate(wIdx, dIdx)
                    })}
                    onMouseLeave={() => setHoveredDay(null)}
                    className={`w-[9px] h-[9px] rounded-[2px] transition-all duration-200 cursor-crosshair hover:scale-130 hover:z-10 ${getIntensityColor(level)}`}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Month Indicators bar */}
          <div className="flex justify-between text-[8px] text-white/30 pt-2 px-1 select-none font-bold uppercase tracking-wider">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
          </div>
        </div>
      </div>

      {/* Key Legenda & Tooltips */}
      <div className="flex justify-between items-center pt-4 border-t border-white/5 mt-4 text-[9px] select-none text-white/40">
        
        {/* Hover Tooltip output */}
        <div className="h-4 flex items-center font-bold text-neon-cyan uppercase">
          <AnimatePresence mode="wait">
            {hoveredDay ? (
              <motion.span
                key={hoveredDay.date}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex items-center space-x-1"
              >
                <span>{hoveredDay.count} commits on {hoveredDay.date}</span>
              </motion.span>
            ) : (
              <span className="text-white/20">Hover over active nodes to audit logs</span>
            )}
          </AnimatePresence>
        </div>

        {/* Legend Scale */}
        <div className="flex items-center space-x-1 font-bold">
          <span>LESS</span>
          <span className="w-2 h-2 rounded-[1px] bg-white/5 border border-white/5" />
          <span className="w-2 h-2 rounded-[1px] bg-cyan-950/40 border border-cyan-900/30" />
          <span className="w-2 h-2 rounded-[1px] bg-cyan-800/60 border border-cyan-700/40" />
          <span className="w-2 h-2 rounded-[1px] bg-cyan-500/80 border border-cyan-400/40" />
          <span className="w-2 h-2 rounded-[1px] bg-neon-cyan border border-cyan-300/60" />
          <span>MORE</span>
        </div>
      </div>
    </div>
  );
}
