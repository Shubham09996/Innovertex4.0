import React, { useMemo, useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from '../../context/AuthContext';

export default function MentorProfilePage() {
  const { user, token, loading: authLoading } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@hackverse.com",
    bio: "Senior Software Engineer with 10+ years of experience in AI/ML and full-stack development. Passionate about mentoring developers and guiding teams through their hackathon journey. I believe in the power of technology to solve real-world problems.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    skills: ["AI/ML", "Python", "React", "Node.js", "Machine Learning", "Mentoring", "Team Leadership"],
    certificates: [
      { id: 1, name: "AWS Solutions Architect", authority: "Amazon", date: "Jan 2021" },
      { id: 2, name: "Google Cloud Professional", authority: "Google", date: "Apr 2021" },
      { id: 3, name: "Microsoft Azure Expert", authority: "Microsoft", date: "Sep 2021" },
      { id: 4, name: "Mentoring Excellence", authority: "HackVerse", date: "Dec 2023" },
    ],
  });

  const [badges] = useState([
    { id: 1, name: "Mentor Champion", icon: "🎓", desc: "Mentored 50+ teams successfully" },
    { id: 2, name: "Innovation Guide", icon: "💡", desc: "Helped teams win 20+ hackathons" },
    { id: 3, name: "Team Builder", icon: "👥", desc: "Built strong collaborative teams" },
    { id: 4, name: "Tech Expert", icon: "💻", desc: "Expert in multiple technologies" },
    { id: 5, name: "Satisfaction Star", icon: "⭐", desc: "4.8+ average satisfaction rating" },
  ]);

  const stats = {
    teamsMentored: 25,
    activeTeams: 5,
    completedProjects: 20,
    totalHours: 320,
    satisfactionScore: 4.8,
    hackathons: 15,
  };

  // 30-day activity (0-3)
  const activity30 = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 30; i++) arr.push(Math.floor(Math.random() * 4));
    return arr;
  }, []);

  // modal state
  const [openEdit, setOpenEdit] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [activeTab, setActiveTab] = useState("Activity"); // New state for active tab

  // update profile (mock)
  const handleSaveProfile = (newProfile) => {
    setProfile(newProfile);
    setOpenEdit(false);
    // small celebration when saving
    setCelebrate(true);
    setTimeout(() => setCelebrate(false), 1600);
  };

  return (
    <main className="min-h-screen bg-bg text-text py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left: Profile header + badges + edit */}
        <section className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl bg-card backdrop-blur-md border border-border p-6 shadow-xl"
          >
            {/* Header */}
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
                {/* animated ring */}
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
                      className="px-3 py-1 rounded-full bg-gradient-to-r from-primary to-primary-2 text-white text-xs font-medium shadow-sm"
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
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-green-400 to-teal-400 text-white px-4 py-2 rounded-full text-sm font-semibold"
                  >
                    ⚡ Boost
                  </button>

                  <div className="ml-auto hidden md:flex items-center gap-4">
                    <StatMini label="Teams Mentored" value={stats.teamsMentored} />
                    <StatMini label="Active Teams" value={stats.activeTeams} />
                    <StatMini label="Hours" value={stats.totalHours} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Gamified Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <StatCard
              title="Mentor Rank"
              value="#8"
              subtitle="Top 5% overall"
              accent="from-primary to-accent"
            />
            <StatCard
              title="Mentoring XP"
              value={`${stats.totalHours} hrs`}
              subtitle="Level 15"
              accent="from-yellow-400 to-orange-400"
            />
            <StatCard
              title="Teams Mentored"
              value={stats.teamsMentored}
              subtitle="Completed"
              accent="from-green-400 to-teal-400"
            />
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex space-x-4 border-b border-border mb-6">
            <button
              onClick={() => setActiveTab("Activity")}
              className={`py-2 px-4 text-lg font-semibold border-b-2 ${activeTab === "Activity" ? "border-primary text-primary" : "border-transparent text-muted hover:text-text"} transition-colors duration-200`}
            >
              Activity
            </button>
            <button
              onClick={() => setActiveTab("Badges")}
              className={`py-2 px-4 text-lg font-semibold border-b-2 ${activeTab === "Badges" ? "border-primary text-primary" : "border-transparent text-muted hover:text-text"} transition-colors duration-200`}
            >
              Badges
            </button>
            <button
              onClick={() => setActiveTab("Certificates")}
              className={`py-2 px-4 text-lg font-semibold border-b-2 ${activeTab === "Certificates" ? "border-primary text-primary" : "border-transparent text-muted hover:text-text"} transition-colors duration-200`}
            >
              Certificates
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "Activity" && (
            <div className="space-y-6">
              {/* Heatmap */}
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

              {/* Recent Activity */}
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
                  <ActivityItem title="Mentored TechTitans team on API integration" time="2 days ago" accent="from-pink-500 to-purple-500" />
                  <ActivityItem title="Guided DataDrivers through database optimization" time="7 days ago" accent="from-indigo-500 to-blue-400" />
                  <ActivityItem title="Helped CodeCrafters with blockchain implementation" time="12 days ago" accent="from-green-400 to-teal-300" />
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
              transition={{ delay: 0.25 }} // Stagger animation
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

        {/* Right column: Large Rank ring + detailed stats */}
        <aside className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-card backdrop-blur p-6 border border-border text-center"
          >
            <h4 className="text-sm text-muted mb-4">Mentor Standing</h4>
            <CircularRank percent={88} rank="#8" points={stats.totalHours} />
            <div className="mt-6 space-y-3 text-left">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Mentoring Accuracy</span>
                <span className="font-semibold text-text">96%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Team Rating</span>
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
              <SmallStat label="Teams" value={stats.teamsMentored} color="indigo" />
              <SmallStat label="Hackathons" value={stats.hackathons} color="green" />
              <SmallStat label="Projects" value={stats.completedProjects} color="blue" />
              <SmallStat label="Hours" value={stats.totalHours} color="yellow" />
            </div>
          </motion.div>
        </aside>
      </div>

      {/* Edit Modal */}
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

/* ---------------------- Subcomponents ---------------------- */

const StatMini = ({ label, value }) => (
  <div className="text-center">
    <p className="text-xs text-muted">{label}</p>
    <p className="text-sm font-semibold text-text">{value}</p>
  </div>
);

const StatCard = ({ title, value, subtitle, accent = "from-primary to-accent" }) => (
  <motion.div
    whileHover={{ y: -6 }}
    className={`rounded-2xl p-4 bg-gradient-to-br ${accent} shadow-2xl text-white`}
  >
    <p className="text-sm opacity-90">{title}</p>
    <h3 className="text-2xl font-bold mt-2">{value}</h3>
    <p className="text-xs mt-1 opacity-80">{subtitle}</p>
  </motion.div>
);

const CircularRank = ({ percent = 70, rank = "#8", points = 1500 }) => {
  // circle SVG radius and circumference
  const size = 160;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative inline-block">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-700"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold text-text">{rank}</div>
        <div className="text-xs text-muted">{points} pts</div>
      </div>
    </div>
  );
};

const SmallStat = ({ label, value, color = "indigo" }) => {
  const colorClasses = {
    indigo: "from-indigo-500 to-indigo-600",
    green: "from-green-500 to-green-600",
    blue: "from-blue-500 to-blue-600",
    yellow: "from-yellow-500 to-yellow-600",
  };

  return (
    <div className="text-center p-3 rounded-lg bg-bg-elev">
      <div className={`w-8 h-8 mx-auto mb-2 rounded-full bg-gradient-to-r ${colorClasses[color]} flex items-center justify-center`}>
        <span className="text-white text-sm font-bold">{value}</span>
      </div>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
};

const ActivityItem = ({ title, time, accent = "from-primary to-accent" }) => (
  <motion.li
    whileHover={{ x: 4 }}
    className="flex items-center gap-3 p-3 rounded-lg bg-bg-elev hover:bg-border transition-colors"
  >
    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${accent}`} />
    <div className="flex-1">
      <p className="text-sm font-medium text-text">{title}</p>
      <p className="text-xs text-muted">{time}</p>
    </div>
  </motion.li>
);

const BadgeCard = ({ badge }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -2 }}
    className="flex items-center gap-3 p-3 rounded-lg bg-bg-elev border border-border"
  >
    <span className="text-2xl">{badge.icon}</span>
    <div className="flex-1">
      <p className="font-semibold text-text text-sm">{badge.name}</p>
      <p className="text-xs text-muted">{badge.desc}</p>
    </div>
  </motion.div>
);

const GitHubLikeActivityGraph = () => {
  const activityData = Array.from({ length: 30 }, () => Math.floor(Math.random() * 4));
  
  return (
    <div className="grid grid-cols-7 gap-1">
      {activityData.map((level, i) => (
        <div
          key={i}
          className={`w-3 h-3 rounded-sm ${
            level === 0
              ? "bg-gray-700"
              : level === 1
              ? "bg-primary/30"
              : level === 2
              ? "bg-primary/60"
              : "bg-primary"
          }`}
        />
      ))}
    </div>
  );
};

const BurstParticles = () => (
  <div className="absolute inset-0 rounded-full overflow-hidden">
    {Array.from({ length: 12 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-yellow-400 rounded-full"
        initial={{ scale: 0, x: 0, y: 0 }}
        animate={{
          scale: [0, 1, 0],
          x: Math.cos((i * 30 * Math.PI) / 180) * 40,
          y: Math.sin((i * 30 * Math.PI) / 180) * 40,
        }}
        transition={{ duration: 1.5, delay: i * 0.1 }}
      />
    ))}
  </div>
);

const EditProfileModal = ({ profile, onClose, onSave }) => {
  const [formData, setFormData] = useState(profile);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-card border border-border rounded-2xl p-6 w-full max-w-md"
      >
        <h3 className="text-xl font-bold text-text mb-4">Edit Profile</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-text mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 bg-bg-elev border border-border rounded-lg text-text"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text mb-2">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={3}
              className="w-full p-3 bg-bg-elev border border-border rounded-lg text-text resize-none"
            />
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-transparent border border-border text-text rounded-lg font-semibold hover:bg-bg-elev transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-2 transition-colors"
          >
            Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
