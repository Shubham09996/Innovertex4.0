/* GlobalLeaderboardPage.jsx
  Dependencies: react, framer-motion, lucide-react
  TailwindCSS must be configured in your project.
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ChevronDown, Users, Zap, ShieldCheck, TrendingUp } from 'lucide-react';

// --- DUMMY DATA ---
// Real application mein yeh data API se aayega
const initialLeaderboardData = [
  { id: 1, name: 'CyberNinjas', score: 15800, avatarSeed: 'Ninjas', wins: 8, streak: 12, team: ['Alex', 'Brenda', 'Carl'], history: [15700, 15750, 15720, 15780, 15800] },
  { id: 2, name: 'CodeCrusaders', score: 15650, avatarSeed: 'Crusaders', wins: 7, streak: 5, team: ['David', 'Eva', 'Frank'], history: [15600, 15620, 15680, 15640, 15650] },
  { id: 3, name: 'BinaryBrawlers', score: 15200, avatarSeed: 'Brawlers', wins: 9, streak: 2, team: ['Grace', 'Heidi', 'Ivan'], history: [15150, 15180, 15220, 15190, 15200] },
  { id: 4, name: 'DataDragons', score: 14950, avatarSeed: 'Dragons', wins: 5, streak: 0, team: ['Judy', 'Mallory', 'Oscar'], history: [14900, 14920, 14910, 14960, 14950] },
  { id: 5, name: 'LogicLords', score: 14800, avatarSeed: 'Lords', wins: 6, streak: 1, team: ['Peggy', 'Sybil', 'Trent'], history: [14750, 14780, 14810, 14790, 14800] },
  { id: 6, name: 'Innovortex Team', score: 14500, avatarSeed: 'Innovortex', wins: 4, streak: 15, team: ['Shubham', 'Sneha', 'Om'], history: [14450, 14480, 14520, 14490, 14500] }, // Current User
  { id: 7, name: 'QuantumCoders', score: 14200, avatarSeed: 'Quantum', wins: 3, streak: 3, team: ['Victor', 'Walter', 'Wendy'], history: [14150, 14180, 14210, 14190, 14200] },
  { id: 8, name: 'SyntaxStrikers', score: 13900, avatarSeed: 'Syntax', wins: 5, streak: 8, team: ['Xavier', 'Yara', 'Zane'], history: [13850, 13880, 13920, 13890, 13900] },
  { id: 9, name: 'PixelPioneers', score: 13500, avatarSeed: 'Pioneers', wins: 2, streak: 0, team: ['Alice', 'Bob', 'Charlie'], history: [13450, 13480, 13510, 13490, 13500] },
  { id: 10, name: 'GlitchHunters', score: 13250, avatarSeed: 'Hunters', wins: 4, streak: 4, team: ['Diana', 'Edward', 'Fiona'], history: [13200, 13220, 13260, 13230, 13250] },
];

const CURRENT_USER_ID = 6; // Yeh demonstration ke liye hai, real app mein login se aayega

// --- MAIN COMPONENT ---
export default function GlobalLeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState(initialLeaderboardData.map((u, i) => ({...u, rank: i + 1})));
  const [expandedRow, setExpandedRow] = useState(null);

  // Live updates simulate karne ke liye
  useEffect(() => {
    const interval = setInterval(() => {
      setLeaderboard(currentLeaderboard => {
        // Scores aur history update karein
        const updated = currentLeaderboard.map(user => {
          const scoreChange = Math.floor(Math.random() * 51) - 20; // -20 to +30
          const newScore = Math.max(0, user.score + scoreChange);
          const newHistory = [...user.history.slice(1), newScore];
          return { ...user, score: newScore, history: newHistory };
        });
        
        // Naye scores ke hisaab se sort karke rank update karein
        return updated
          .sort((a, b) => b.score - a.score)
          .map((user, index) => ({ ...user, rank: index + 1 }));
      });
    }, 2500); // Har 2.5 seconds mein update

    return () => clearInterval(interval);
  }, []);

  const handleRowClick = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };
  
  const topThree = leaderboard.slice(0, 3);
  const restOfList = leaderboard.slice(3);

  return (
    <div className="min-h-screen bg-bg text-text font-sans pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Global Leaderboard
          </h1>
          <p className="mt-4 text-lg text-muted">Ranks live update ho rahi hain. Competition ko live dekhein!</p>
        </motion.div>

        <Podium topThree={topThree} />

        <div className="mt-8 bg-card/50 border border-border rounded-2xl shadow-xl overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-border bg-card/30 text-xs text-muted font-semibold uppercase tracking-wider">
            <div className="col-span-1">Rank</div>
            <div className="col-span-5">Player</div>
            <div className="col-span-2 text-right">Wins</div>
            <div className="col-span-3 text-right">Score</div>
            <div className="col-span-1 text-right"></div>
          </div>
          
          <AnimatePresence>
            {restOfList.map((user) => (
              <LeaderboardRow
                key={user.id}
                user={user}
                isCurrentUser={user.id === CURRENT_USER_ID}
                isExpanded={expandedRow === user.id}
                onToggle={() => handleRowClick(user.id)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

const Podium = ({ topThree }) => {
    const podiumStyles = [
        { rank: 2, order: 'md:order-1', color: 'bg-gradient-to-t from-slate-400 to-slate-300', trophyColor: '#AAB5C2' },
        { rank: 1, order: 'md:order-2', color: 'bg-gradient-to-t from-amber-400 to-yellow-300', trophyColor: '#FFBF00', scale: 'md:scale-110' },
        { rank: 3, order: 'md:order-3', color: 'bg-gradient-to-t from-amber-600 to-orange-500', trophyColor: '#B87333' },
    ];

    return (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            {topThree.map(user => {
                const style = podiumStyles.find(s => s.rank === user.rank) || {};
                return (
                    <motion.div
                        layoutId={`leaderboard-user-${user.id}`}
                        key={user.id}
                        className={`relative p-6 rounded-2xl border border-border text-center flex flex-col items-center ${style.order} ${style.scale} hover:!scale-115 transition-transform duration-300 z-10 hover:z-20`}
                    >
                        <div className={`absolute inset-0 ${style.color} opacity-20 rounded-2xl`}></div>
                        <motion.div
                            animate={user.rank === 1 ? { scale: [1, 1.05, 1], transition: { duration: 1.5, repeat: Infinity } } : {}}
                        >
                            <Trophy size={48} style={{color: style.trophyColor, filter: `drop-shadow(0 4px 6px rgba(0,0,0,0.3))`}} className="mb-4"/>
                        </motion.div>
                        <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.avatarSeed}`} alt={user.name} className="w-24 h-24 rounded-full border-4 border-white/50 shadow-lg mb-2"/>
                        <h3 className="text-xl font-bold text-text">{user.name}</h3>
                        <p className={`font-bold text-2xl text-transparent bg-clip-text ${style.color}`}>{user.score.toLocaleString()} PTS</p>
                    </motion.div>
                );
            })}
        </motion.div>
    );
};

const LeaderboardRow = ({ user, isCurrentUser, isExpanded, onToggle }) => {
    return (
        <motion.div layoutId={`leaderboard-user-${user.id}`} className={`border-b border-border last:border-b-0 ${isCurrentUser ? 'bg-primary/10' : ''}`}>
            <div onClick={onToggle} className={`grid grid-cols-5 md:grid-cols-12 gap-4 px-6 py-4 items-center cursor-pointer transition-colors ${!isCurrentUser ? 'hover:bg-card/40' : ''}`}>
                <div className="col-span-1 md:hidden flex items-center justify-center text-lg font-bold text-muted">{user.rank}</div>
                <div className="col-span-3 md:hidden flex items-center gap-3">
                    <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.avatarSeed}`} alt={user.name} className="w-10 h-10 rounded-full"/>
                    <div>
                        <p className="font-semibold text-text">{user.name}</p>
                        <p className="text-sm font-bold text-primary">{user.score.toLocaleString()} PTS</p>
                    </div>
                </div>
                <div className="col-span-1 md:hidden flex justify-end">
                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}><ChevronDown size={20} className="text-muted"/></motion.div>
                </div>
                <div className="hidden md:block col-span-1 text-lg font-bold text-muted">{user.rank}</div>
                <div className="hidden md:flex col-span-5 items-center gap-4">
                    <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.avatarSeed}`} alt={user.name} className="w-10 h-10 rounded-full"/>
                    <span className="font-semibold text-text">{user.name}</span>
                </div>
                <div className="hidden md:block col-span-2 text-right text-muted">{user.wins}</div>
                <div className="hidden md:block col-span-3 text-right text-lg font-bold text-primary">{user.score.toLocaleString()}</div>
                <div className="hidden md:flex col-span-1 justify-end">
                     <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}><ChevronDown size={20} className="text-muted"/></motion.div>
                </div>
            </div>
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="bg-bg-elev px-6 pb-4 pt-2 grid grid-cols-1 md:grid-cols-12 gap-4">
                           <div className="md:col-start-2 md:col-span-11 text-sm text-muted">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                    <DetailStat Icon={Users} label="Team" value={user.team.join(', ')} />
                                    <DetailStat Icon={Zap} label="Current Streak" value={`${user.streak} days`} />
                                    <DetailStat Icon={ShieldCheck} label="Wins" value={user.wins} />
                                    <DetailStat Icon={TrendingUp} label="Score History">
                                        <Sparkline data={user.history} />
                                    </DetailStat>
                                </div>
                           </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const DetailStat = ({ Icon, label, value, children }) => (
    <div className="flex items-start gap-3 bg-card/50 p-3 rounded-lg">
        <Icon className="w-5 h-5 mt-0.5 text-primary/80 shrink-0" />
        <div>
            <p className="text-xs text-muted">{label}</p>
            {value && <p className="text-sm font-semibold text-text">{value}</p>}
            {children}
        </div>
    </div>
);

const Sparkline = ({ data }) => {
    const width = 100;
    const height = 30;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min === 0 ? 1 : max - min;

    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((d - min) / range) * height;
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-8 mt-1">
            <polyline
                fill="none"
                stroke="var(--primary)" // Ensure you have a CSS variable for primary color
                strokeWidth="2"
                points={points}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};