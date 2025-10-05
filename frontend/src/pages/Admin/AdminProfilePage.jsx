import React, { useMemo, useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from '../../context/AuthContext';

// Mock components - these would be imported from shared components in a real app
const StatCard = ({ title, value, subtitle, accent }) => (
  <div className="bg-card border border-border rounded-xl p-6">
    <div className="text-center">
      <div className={`text-3xl font-bold bg-gradient-to-r ${accent} bg-clip-text text-transparent mb-2`}>
        {value}
      </div>
      <div className="text-sm text-muted">{title}</div>
      <div className="text-xs text-muted mt-1">{subtitle}</div>
    </div>
  </div>
);

const StatMini = ({ label, value }) => (
  <div className="text-center">
    <div className="text-lg font-bold text-text">{value}</div>
    <div className="text-xs text-muted">{label}</div>
  </div>
);

const CircularRank = ({ percent, rank, points }) => (
  <div className="w-24 h-24 mx-auto mb-4 relative">
    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="currentColor"
        strokeWidth="8"
        fill="none"
        className="text-bg-elev"
      />
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="url(#gradient)"
        strokeWidth="8"
        fill="none"
        strokeDasharray={`${percent * 2.51} 251`}
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <div className="text-lg font-bold text-text">{rank}</div>
      <div className="text-xs text-muted">{points}</div>
    </div>
  </div>
);

const SmallStat = ({ label, value, color }) => (
  <div className="text-center p-3 bg-bg-elev rounded-lg">
    <div className={`text-lg font-bold text-${color}-400`}>{value}</div>
    <div className="text-xs text-muted">{label}</div>
  </div>
);

const ActivityItem = ({ title, time, accent }) => (
  <div className="flex items-center gap-3 p-3 bg-bg-elev rounded-lg">
    <div className={`w-8 h-8 bg-gradient-to-r ${accent} rounded-full flex items-center justify-center`}>
      <span className="text-white text-sm">📊</span>
    </div>
    <div>
      <p className="text-sm font-medium text-text">{title}</p>
      <p className="text-xs text-muted">{time}</p>
    </div>
  </div>
);

const BadgeCard = ({ badge }) => (
  <div className="flex items-center gap-3 p-3 bg-bg-elev rounded-lg">
    <span className="text-2xl">{badge.icon}</span>
    <div>
      <p className="font-semibold text-text">{badge.name}</p>
      <p className="text-sm text-muted">{badge.desc}</p>
    </div>
  </div>
);

const BurstParticles = () => {
  // simple SVG particles that appear around avatar
  const parts = Array.from({ length: 10 });
  return (
    <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {parts.map((_, i) => {
        const angle = (i / parts.length) * Math.PI * 2;
        const x = 100 + Math.cos(angle) * (40 + Math.random() * 10);
        const y = 100 + Math.sin(angle) * (40 + Math.random() * 10);
        const size = 4 + Math.random() * 6;
        const delay = i * 0.03;
        const colors = ["#FDE68A", "#FDBA74", "#FCA5A5", "#93C5FD", "#C7B2FF"];
        const color = colors[i % colors.length];
        return (
          <motion.circle
            key={i}
            cx={100}
            cy={100}
            r={size}
            fill={color}
            initial={{ cx: 100, cy: 100, opacity: 1, scale: 0.2 }}
            animate={{ cx: x, cy: y, opacity: 0, scale: 1 }}
            transition={{ duration: 0.9, delay, ease: "easeOut" }}
          />
        );
      })}
    </svg>
  );
};

const GitHubLikeActivityGraph = () => {
  const activity30 = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 30; i++) arr.push(Math.floor(Math.random() * 4));
    return arr;
  }, []);

  return (
    <div className="grid grid-cols-7 gap-1 mb-4">
      {activity30.map((level, i) => (
        <div
          key={i}
          className={`h-3 rounded-sm ${
            level === 0 ? 'bg-bg-elev' :
            level === 1 ? 'bg-primary/30' :
            level === 2 ? 'bg-primary/60' : 'bg-primary'
          }`}
        />
      ))}
    </div>
  );
};

const EditProfileModal = ({ profile, onClose, onSave }) => {
  const [editProfile, setEditProfile] = useState(profile);
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-md p-6">
        <h3 className="text-xl font-bold text-text mb-4">Edit Profile</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-2">Name</label>
            <input
              type="text"
              value={editProfile.name}
              onChange={(e) => setEditProfile({...editProfile, name: e.target.value})}
              className="w-full p-3 bg-bg-elev border border-border rounded-lg text-text"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-2">Bio</label>
            <textarea
              value={editProfile.bio}
              onChange={(e) => setEditProfile({...editProfile, bio: e.target.value})}
              className="w-full p-3 bg-bg-elev border border-border rounded-lg text-text h-24"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-bg-elev border border-border text-text rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(editProfile)}
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AdminProfilePage() {
  const { user, token, loading: authLoading } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    name: "Dr. Sarah Johnson",
    email: "admin@innovertex.com",
    bio: "Senior Platform Administrator with 10+ years of experience in system management and user analytics. Passionate about maintaining platform excellence and ensuring smooth operations for all users.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    skills: ["System Administration", "Data Analytics", "Platform Management", "User Support", "Security", "Performance Monitoring"],
    certificates: [
      { id: 1, name: "AWS Solutions Architect", authority: "Amazon", date: "Jan 2020" },
      { id: 2, name: "Google Cloud Professional", authority: "Google", date: "Apr 2020" },
      { id: 3, name: "Microsoft Azure Expert", authority: "Microsoft", date: "Sep 2020" },
      { id: 4, name: "Platform Administration", authority: "Innovertex", date: "Dec 2023" },
    ],
  });

  const [badges] = useState([
    { id: 1, name: "Platform Master", icon: "👑", desc: "Full platform administration access" },
    { id: 2, name: "Data Analyst", icon: "📊", desc: "Expert in platform analytics" },
    { id: 3, name: "System Guardian", icon: "🛡️", desc: "Platform security specialist" },
    { id: 4, name: "User Advocate", icon: "👥", desc: "Champion of user experience" },
    { id: 5, name: "Performance Optimizer", icon: "⚡", desc: "Platform performance expert" },
  ]);

  const stats = {
    platformUptime: 99.9,
    totalUsers: 25,
    totalHackathons: 15,
    totalSubmissions: 320,
    systemHealth: 98.5,
    responseTime: 120,
    teamsManaged: 25,
    activeTeams: 5,
    totalHours: 320,
  };

  const activity30 = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 30; i++) arr.push(Math.floor(Math.random() * 4));
    return arr;
  }, []);

  const [openEdit, setOpenEdit] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [activeTab, setActiveTab] = useState("Activity");

  const handleSaveProfile = (newProfile) => {
    setProfile(newProfile);
    setOpenEdit(false);
    setCelebrate(true);
    setTimeout(() => setCelebrate(false), 1600);
  };

  return (
    <main className="min-h-screen bg-bg text-text py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl bg-card backdrop-blur-md border border-border p-6 shadow-xl"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <motion.img
                  src={profile.avatar}
                  alt="avatar"
                  className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-primary p-0"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                />
                <motion.div
                  className="absolute -inset-1 rounded-full pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: celebrate ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <BurstParticles />
                </motion.div>
              </div>

              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
                  {profile.name}
                </h2>
                <p className="text-sm text-muted mt-1 max-w-xl">{profile.bio}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {profile.skills.map((s) => (
                    <motion.span
                      key={s}
                      whileHover={{ y: -4, scale: 1.03 }}
                      className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-medium shadow-sm"
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3 items-center">
                  <button
                    onClick={() => setOpenEdit(true)}
                    className="inline-flex items-center gap-2 bg-bg-elev hover:bg-border px-4 py-2 rounded-full backdrop-blur text-sm font-semibold text-text"
                  >
                    ✏️ Edit Profile
                  </button>

                  <button
                    onClick={() => {
                      setCelebrate(true);
                      setTimeout(() => setCelebrate(false), 1400);
                    }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold"
                  >
                    ⚡ Boost
                  </button>

                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6"
          >
            <StatCard
              title="Admin Rank"
              value="#1"
              subtitle="Top 1% overall"
              accent="from-purple-500 to-purple-600"
            />
            <StatCard
              title="Admin XP"
              value={`${stats.totalHours} hrs`}
              subtitle="Level 20"
              accent="from-orange-400 to-orange-500"
            />
            <StatCard
              title="Teams Managed"
              value={stats.teamsManaged}
              subtitle="Completed"
              accent="from-green-400 to-green-500"
            />
          </motion.div>

          <div className="flex space-x-4 border-b border-border mb-6">
            <button
              onClick={() => setActiveTab("Activity")}
              className={`py-2 px-4 text-lg font-semibold border-b-2 ${activeTab === "Activity" ? "border-purple-500 text-purple-500" : "border-transparent text-muted hover:text-text"} transition-colors duration-200`}
            >
              Activity
            </button>
            <button
              onClick={() => setActiveTab("Badges")}
              className={`py-2 px-4 text-lg font-semibold border-b-2 ${activeTab === "Badges" ? "border-purple-500 text-purple-500" : "border-transparent text-muted hover:text-text"} transition-colors duration-200`}
            >
              Badges
            </button>
            <button
              onClick={() => setActiveTab("Certificates")}
              className={`py-2 px-4 text-lg font-semibold border-b-2 ${activeTab === "Certificates" ? "border-purple-500 text-purple-500" : "border-transparent text-muted hover:text-text"} transition-colors duration-200`}
            >
              Certificates
            </button>
          </div>

          {activeTab === "Activity" && (
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="rounded-2xl bg-card backdrop-blur p-6 border border-border"
              >
                <h3 className="font-semibold text-lg mb-4">Activity Heatmap (30d)</h3>
                <GitHubLikeActivityGraph />
                <p className="mt-4 text-sm text-muted">Consistent mentoring activity earns bonus points & badges.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-card backdrop-blur p-6 border border-border"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Recent Activity</h3>
                  <span className="text-sm text-muted">See all</span>
                </div>
                <ul className="space-y-3">
                  <ActivityItem title="Platform analytics reviewed" time="2 hours ago" accent="from-pink-500 to-purple-500" />
                  <ActivityItem title="User management tasks completed" time="1 day ago" accent="from-indigo-500 to-blue-400" />
                  <ActivityItem title="Security audit performed" time="3 days ago" accent="from-green-400 to-teal-300" />
                </ul>
              </motion.div>
            </div>
          )}

          {activeTab === "Badges" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl bg-card backdrop-blur p-6 border border-border"
            >
              <h3 className="font-semibold text-lg mb-4">Badges</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {badges.map((b) => (
                  <BadgeCard key={b.id} badge={b} />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "Certificates" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="rounded-2xl bg-card backdrop-blur p-6 border border-border"
            >
              <h3 className="font-semibold text-lg mb-4">My Certificates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.certificates.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.03, boxShadow: "0 8px 16px rgba(0,0,0,0.2)" }}
                    className="bg-bg-elev rounded-lg p-4 border border-border flex flex-col items-start space-y-2"
                  >
                    <p className="text-lg font-bold text-primary-2">{cert.name}</p>
                    <p className="text-sm text-muted">{cert.authority}</p>
                    <p className="text-xs text-muted">Issued: {cert.date}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </section>

        <aside className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-card backdrop-blur p-6 border border-border text-center"
          >
            <h4 className="text-sm text-muted mb-4">Admin Status</h4>
            <CircularRank percent={88} rank="#1" points={stats.totalHours} />
            <div className="mt-6 space-y-3 text-left">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Admin Accuracy</span>
                <span className="font-semibold text-text">96%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">User Rating</span>
                <span className="font-semibold text-text">4.8/5</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Success Rate</span>
                <span className="font-semibold text-text">+156%</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-card backdrop-blur p-6 border border-border"
          >
            <h4 className="text-sm text-muted mb-4">Quick Stats</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-bg-elev rounded-lg">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-sm font-bold">{stats.teamsManaged}</span>
                </div>
                <div className="text-xs text-muted">Teams</div>
              </div>
              <div className="text-center p-3 bg-bg-elev rounded-lg">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-sm font-bold">{stats.totalHackathons}</span>
                </div>
                <div className="text-xs text-muted">Hackathons</div>
              </div>
            </div>
          </motion.div>
        </aside>
      </div>

      <AnimatePresence>
        {openEdit && (
          <EditProfileModal
            profile={profile}
            onClose={() => setOpenEdit(false)}
            onSave={handleSaveProfile}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
