// OrganizerProfilePage.jsx
import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContext } from 'react'; // Import useContext
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext
import api from '../../utils/api'; // Import api

/**
 * Requirements:
 * - Tailwind CSS configured
 * - framer-motion installed
 *
 * Usage:
 * <OrganizerProfilePage />
 */

const OrganizerProfilePage = () => {
  // Mock organizer data
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@hackverse.com",
    bio: "Passionate about fostering innovation through hackathons. I've organized 50+ successful events and helped thousands of developers bring their ideas to life. Love connecting talented minds and creating opportunities for growth.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    skills: ["Event Management", "Community Building", "Project Coordination", "Team Leadership", "Strategic Planning"],
    certificates: [
      { id: 1, name: "Event Management Certification", authority: "EventPro", date: "Jan 2022" },
      { id: 2, name: "Community Leadership Program", authority: "Leadership Institute", date: "Apr 2022" },
      { id: 3, name: "Project Management Professional", authority: "PMI", date: "Sep 2022" },
    ],
  });

  const [badges] = useState([
    { id: 1, name: "Top Organizer", icon: "🏆", desc: "Highest rated organizer this year" },
    { id: 2, name: "Community Builder", icon: "👥", desc: "Built largest hackathon community" },
    { id: 3, name: "Innovation Catalyst", icon: "💡", desc: "Launched 20+ innovative events" },
    { id: 4, name: "Event Master", icon: "🎪", desc: "Organized 50+ successful hackathons" },
    { id: 5, name: "Mentor Champion", icon: "🎓", desc: "Connected 500+ mentors with participants" },
  ]);

  const stats = {
    hackathons: 0,
    wins: 0,
    projects: 0,
    points: 0,
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, token, logout } = useContext(AuthContext);
  const [activityGraphData, setActivityGraphData] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!token || !user) {
        setLoading(false);
        return;
      }
      try {
        const profileData = await api.getProfile(token);
        setProfile({
          name: profileData.username,
          email: profileData.email,
          bio: profileData.bio || "No bio available.",
          avatar: profileData.avatar || `https://ui-avatars.com/api/?name=${profileData.username}`,
          skills: profileData.skills || [],
          certificates: profileData.certificates || [],
          // Map other dynamic stats if available
          hackathons: profileData.assignedHackathons ? profileData.assignedHackathons.length : 0,
          organizerRank: profileData.organizerRank || "N/A",
          eventXP: profileData.eventXP || 0,
          eventSuccessRate: profileData.eventSuccessRate || 0,
          participantSatisfaction: profileData.participantSatisfaction || 0,
          communityGrowth: profileData.communityGrowth || 0,
        });

        // Fetch activity graph data
        const graphData = await api.getOrganizerActivityGraphData(token);
        setActivityGraphData(graphData.map(d => ({ ...d, date: new Date(d.date) }))); // Convert date strings to Date objects

        setLoading(false);
      } catch (err) {
        console.error("Error fetching organizer profile data:", err);
        setError(err.message || 'Failed to fetch profile data');
        setLoading(false);
        logout(); // Logout on error or unauthorized access
      }
    };
    fetchProfileData();
  }, [token, user]);

  const handleSaveProfile = async (newProfile) => {
    try {
      const updatedProfile = await api.updateProfile(
        {
          username: newProfile.name,
          email: newProfile.email,
          bio: newProfile.bio,
          avatar: newProfile.avatar,
          skills: newProfile.skills,
          certificates: newProfile.certificates,
        },
        token
      );
      setProfile({
        name: updatedProfile.username,
        email: updatedProfile.email,
        bio: updatedProfile.bio || "No bio available.",
        avatar: updatedProfile.avatar || `https://ui-avatars.com/api/?name=${updatedProfile.username}`,
        skills: updatedProfile.skills || [],
        certificates: updatedProfile.certificates || [],
        // Retain other dynamic stats as they are not updated via this modal
        hackathons: profile.hackathons,
        organizerRank: profile.organizerRank,
        eventXP: profile.eventXP,
        eventSuccessRate: profile.eventSuccessRate,
        participantSatisfaction: profile.participantSatisfaction,
        communityGrowth: profile.communityGrowth,
      });
      setOpenEdit(false);
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 1600);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert(err.message || 'Failed to update profile.');
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-bg text-text py-24 px-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-bg text-red-500 py-24 px-6 flex items-center justify-center">
        <p>Error: {error}. Please try again later or login again.</p>
      </main>
    );
  }

  // Calculate dynamic stats from profile
  const dynamicStats = {
    hackathons: profile.hackathons,
    wins: 0, // Placeholder, needs dedicated backend field
    projects: 0, // Placeholder, needs dedicated backend field
    points: profile.eventXP,
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
                  {profile.skills && profile.skills.length > 0 ? profile.skills.map((s) => (
                    <motion.span
                      key={s}
                      whileHover={{ y: -4, scale: 1.03 }}
                      className="px-3 py-1 rounded-full bg-gradient-to-r from-primary to-primary-2 text-white text-xs font-medium shadow-sm"
                    >
                      {s}
                    </motion.span>
                  )) : <p className="text-sm text-muted">No skills added yet.</p>}
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
                    <StatMini label="Hackathons" value={dynamicStats.hackathons} />
                    <StatMini label="Wins" value={dynamicStats.wins} />
                    <StatMini label="Points" value={dynamicStats.points} />
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
              title="Organizer Rank"
              value={profile.organizerRank}
              subtitle="Top 5% overall" // This could also be dynamic if rank is number
              accent="from-primary to-accent"
            />
            <StatCard
              title="Event XP"
              value={`${profile.eventXP} pts`}
              subtitle="Level 15" // This could be calculated or dynamic
              accent="from-yellow-400 to-orange-400"
            />
            <StatCard
              title="Events"
              value={profile.hackathons}
              subtitle="Organized"
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
                <h3 className="font-semibold text-lg mb-4">Activity Heatmap (Last 12 Months)</h3>
                <GitHubLikeActivityGraph activityData={activityGraphData} />
                <p className="mt-4 text-sm text-muted">Consistent event management earns bonus points & badges.</p>
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
                  {/* Using a placeholder for now, ideally this would be a separate component that fetches recent activities */}
                  <ActivityItem title="Launched AI Innovation Challenge" time="2 days ago" accent="from-pink-500 to-purple-500" />
                  <ActivityItem title="Organized Web3 Development Hackathon" time="7 days ago" accent="from-indigo-500 to-blue-400" />
                  <ActivityItem title="Mentored 15 teams in Fintech Revolution" time="12 days ago" accent="from-green-400 to-teal-300" />
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
                {profile.certificates && profile.certificates.length > 0 ? profile.certificates.map((cert, index) => (
                  <motion.div
                    key={cert.id || index} // Use cert.id if available, otherwise index
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
                )) : <p className="text-sm text-muted">No certificates added yet.</p>}
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
            <h4 className="text-sm text-muted mb-4">Organizer Standing</h4>
            <CircularRank percent={profile.eventSuccessRate} rank={profile.organizerRank} points={profile.eventXP} />
            <div className="mt-6 space-y-3 text-left">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Event Success Rate</span>
                <span className="font-semibold text-text">{profile.eventSuccessRate}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Participant Satisfaction</span>
                <span className="font-semibold text-text">{profile.participantSatisfaction}/5</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Community Growth</span>
                <span className="font-semibold text-text">+{profile.communityGrowth}%</span>
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
              <SmallStat label="Hackathons" value={dynamicStats.hackathons} color="indigo" />
              <SmallStat label="Wins" value={dynamicStats.wins} color="green" />
              <SmallStat label="Projects" value={dynamicStats.projects} color="blue" />
              <SmallStat label="Points" value={dynamicStats.points} color="yellow" />
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
};

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

const CircularRank = ({ percent = 70, rank = "#23", points = 1500 }) => {
  // circle SVG radius and circumference
  const size = 160;
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="grad1" x1="0%" x2="100%">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--accent)" />
          </linearGradient>
        </defs>
        {/* bg circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--border)"
          strokeWidth={stroke}
          fill="transparent"
        />
        {/* animated foreground */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#grad1)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="transparent"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={circumference - dash}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - dash }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        {/* center text */}
        <text x="50%" y="47%" dominantBaseline="middle" textAnchor="middle" className="text-text" style={{ fontSize: 18, fontWeight: 700 }}>
          {rank}
        </text>
        <text x="50%" y="64%" dominantBaseline="middle" textAnchor="middle" className="text-muted" style={{ fontSize: 12 }}>
          {points} pts
        </text>
      </svg>
    </div>
  );
};

// New component for GitHub-like activity graph
const GitHubLikeActivityGraph = ({ activityData }) => {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  useEffect(() => {
    const calculateStreaks = (data) => {
      let current = 0;
      let max = 0;
      for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].level > 0) {
          current++;
        } else {
          if (current > max) {
            max = current;
          }
          current = 0;
        }
      }
      if (current > max) {
        max = current;
      }
      return { current, max };
    };

    const { current, max } = calculateStreaks(activityData);
    setCurrentStreak(current);
    setMaxStreak(max);
  }, [activityData]);

  const colors = [
    "bg-bg-elev/50", // Level 0: No activity
    "bg-primary/20", // Level 1: Low activity
    "bg-primary/40", // Level 2: Medium activity
    "bg-primary/60", // Level 3: High activity
    "bg-primary" // Level 4: Very High activity
  ];

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Group activity data by month for rendering
  const activityByMonth = useMemo(() => {
    const grouped = {};
    activityData.forEach(item => {
      const monthYear = `${months[item.date.getMonth()]}, ${item.date.getFullYear()}`;
      if (!grouped[monthYear]) {
        grouped[monthYear] = Array(daysInMonth(item.date.getMonth(), item.date.getFullYear())).fill(null).map((_, i) => ({ date: new Date(item.date.getFullYear(), item.date.getMonth(), i + 1), level: 0 }));
      }
      const dayOfMonth = item.date.getDate() -1; // 0-indexed day
      grouped[monthYear][dayOfMonth] = item; // Update with actual activity
    });
    return grouped;
  }, [activityData]);

  function daysInMonth (month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  // To make it truly GitHub-like, we need to consider weeks and days of the week.
  // This is a simplified version, but aims for the look.

  const today = new Date();
  const currentMonthIdx = today.getMonth();
  const currentYear = today.getFullYear();

  const yearStart = new Date(currentYear - 1, currentMonthIdx + 1, 1); // Start from a year ago + 1 month
  const weekColumns = Array.from({ length: 53 }).map((_, weekIndex) => {
    const week = [];
    for (let i = 0; i < 7; i++) {
      // This logic needs to be more complex to align days correctly under months
      week.push(null); // Placeholder
    }
    return week;
  });

  const getMonthName = (date) => months[date.getMonth()];

  const renderGitHubGraph = () => {
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setFullYear(endDate.getFullYear() - 1);
    startDate.setDate(startDate.getDate() + 1); // Start from one year ago + 1 day to include a full year

    const weeks = [];
    let currentDate = new Date(startDate);
    let currentWeek = Array(7).fill(null); // Initialize with nulls for each day of week

    // Pad the beginning of the first week with nulls if the start day is not Sunday
    const firstDayOfWeek = currentDate.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek[i] = { date: null, level: 0 }; // Use level 0 for empty days
    }

    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      const activityForDay = activityData.find(d => d.date.toDateString() === currentDate.toDateString());
      currentWeek[dayOfWeek] = activityForDay || { date: new Date(currentDate), level: 0 };

      if (dayOfWeek === 6 || currentDate.toDateString() === endDate.toDateString()) { // End of week or end date
        weeks.push([...currentWeek]);
        currentWeek = Array(7).fill({ date: null, level: 0 }); // Reset for next week with proper structure
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // Pad the end of the last week if it doesn't end on Saturday
    if (currentWeek.some(day => day && day.date)) {
      const lastDayOfWeek = currentDate.getDay();
      for (let i = lastDayOfWeek; i < 7; i++) {
        currentWeek[i] = { date: null, level: 0 };
      }
      weeks.push([...currentWeek]);
    }

    // Determine month headers position
    const monthHeaders = [];
    let currentMonth = -1;
    weeks.forEach((week, weekIndex) => {
      const firstActualDay = week.find(day => day && day.date);
      if (firstActualDay && firstActualDay.date && firstActualDay.date.getMonth() !== currentMonth) {
        currentMonth = firstActualDay.date.getMonth();
        // Estimate month header position. This is a simplification.
        // In a real GitHub graph, month headers are positioned more precisely over the first week of the month.
        monthHeaders.push({ name: `${months[currentMonth]} ${firstActualDay.date.getFullYear()}`, weekIndex });
      }
    });


    return (
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between text-xs text-muted">
          {monthHeaders.map(header => (
            <span key={header.name} className="mr-2" style={{ flexBasis: `calc(100% / ${monthHeaders.length})` }}>{header.name}</span>
          ))}
        </div>
        <div className="flex">
          <div className="grid grid-rows-7 gap-1 pr-1 text-xs text-muted">
            {daysOfWeek.map((day, index) => <span key={day} className={`${index % 2 !== 0 ? 'opacity-0' : ''}`}>{day}</span>)}
          </div>
          <div className="flex flex-wrap gap-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-rows-7 gap-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`w-3 h-3 rounded-[2px] ${colors[day?.level || 0]}`}
                    title={day?.date ? `${day.date.toDateString()}: ${(day.level || 0) > 0 ? (day.level || 0) + ' contributions' : 'No contributions'}` : ''}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center text-sm text-muted mt-4">
          Activity:
          <div className="flex ml-2 space-x-1">
            {colors.map((color, index) => (
              <div key={index} className={`w-3 h-3 rounded-[2px] ${color}`}></div>
            ))}
          </div>
          <span className="ml-4 font-semibold text-text">Current Streak {currentStreak} Days</span>
          <span className="ml-4 font-semibold text-text">Max Streak {maxStreak} Days</span>
        </div>
      </div>
    );
  };

  return renderGitHubGraph();
};

const BadgeCard = ({ badge }) => {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      className="p-3 rounded-lg bg-card border border-border flex items-center gap-2 cursor-pointer overflow-hidden"
      title={badge.desc}
    >
      <div className="w-12 h-12 rounded-full grid place-items-center text-2xl bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
        {badge.icon}
      </div>
      <div className="flex-1 min-w-0 overflow-hidden flex flex-col justify-center">
        <p className="text-sm font-semibold text-text truncate">{badge.name}</p>
        <p className="text-xs text-muted line-clamp-2 leading-tight">{badge.desc}</p>
      </div>
    </motion.div>
  );
};

const ActivityItem = ({ title, time, accent = "from-primary to-accent" }) => (
  <li className="flex items-start gap-3">
    <span className="w-3 h-3 rounded-full bg-gradient-to-br from-primary to-accent mt-1" />
    <div>
      <p className="text-sm font-semibold text-text">{title}</p>
      <p className="text-xs text-muted">{time}</p>
    </div>
  </li>
);

const SmallStat = ({ label, value, color = "primary" }) => {
  const bgColorClass = `bg-${color}-500/20`; // Using primary color for consistency
  const textColorClass = `text-${color}-500`; // Using primary color for consistency

  return (
    <div className={`rounded-lg ${bgColorClass} p-3 text-center border border-border`}>
      <p className="text-xs text-muted">{label}</p>
      <p className={`font-bold ${textColorClass}`}>{value}</p>
    </div>
  );
};

/* ---------------------- Edit Modal ---------------------- */
const EditProfileModal = ({ profile, onClose, onSave }) => {
  const [form, setForm] = React.useState(profile);
  const [skillsInput, setSkillsInput] = React.useState(profile.skills.join(', '));
  const [certificatesInput, setCertificatesInput] = React.useState(profile.certificates);

  useEffect(() => {
    setSkillsInput(profile.skills.join(', '));
    setCertificatesInput(profile.certificates);
  }, [profile]);

  const handleSkillsChange = (e) => {
    setSkillsInput(e.target.value);
  };

  const handleAddSkill = () => {
    const newSkills = skillsInput.split(',').map(s => s.trim()).filter(s => s.length > 0);
    setForm(s => ({ ...s, skills: newSkills }));
  };

  const handleCertificateChange = (index, field, value) => {
    const newCerts = [...certificatesInput];
    newCerts[index] = { ...newCerts[index], [field]: value };
    setCertificatesInput(newCerts);
    setForm(s => ({ ...s, certificates: newCerts }));
  };

  const handleAddCertificate = () => {
    setCertificatesInput(s => [...s, { name: '', authority: '', date: '' }]);
  };

  const handleRemoveCertificate = (index) => {
    setCertificatesInput(s => s.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-black/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <motion.div
        initial={{ y: 30, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.25 }}
        className="relative z-10 w-full max-w-2xl rounded-2xl bg-card backdrop-blur p-6 border border-border text-text"
      >
        <h3 className="text-xl font-bold mb-3">Edit Profile</h3>
        <p className="text-sm text-muted mb-4">Update your public info — changes are instant (mock).</p>

        <div className="grid grid-cols-1 gap-3">
          <input
            className="p-3 rounded-lg bg-bg-elev border border-border text-text"
            value={form.name}
            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
            placeholder="Full name"
          />
          <input
            className="p-3 rounded-lg bg-bg-elev border border-border text-text"
            value={form.email}
            onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
            placeholder="Email"
          />
          <input
            className="p-3 rounded-lg bg-bg-elev border border-border text-text"
            value={form.avatar}
            onChange={(e) => setForm((s) => ({ ...s, avatar: e.target.value }))}
            placeholder="Avatar URL"
          />
          <textarea
            className="p-3 rounded-lg bg-bg-elev border border-border text-text"
            value={form.bio}
            onChange={(e) => setForm((s) => ({ ...s, bio: e.target.value }))}
            rows={3}
            placeholder="Short bio"
          />
          
          {/* Skills Input */}
          <div>
            <label className="block text-sm font-semibold text-text mb-2">Skills (comma-separated)</label>
            <input
              className="p-3 rounded-lg bg-bg-elev border border-border text-text w-full"
              value={skillsInput}
              onChange={handleSkillsChange}
              onBlur={handleAddSkill} // Update skills on blur
              placeholder="e.g., React, Node.js, Project Management"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {form.skills && form.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Certificates Input */}
          <div>
            <label className="block text-sm font-semibold text-text mb-2">Certificates</label>
            <div className="space-y-2">
              {certificatesInput.map((cert, index) => (
                <div key={index} className="flex gap-2 items-end">
                  <input
                    className="p-2 rounded-lg bg-bg-elev border border-border text-text flex-1"
                    value={cert.name}
                    onChange={(e) => handleCertificateChange(index, 'name', e.target.value)}
                    placeholder="Certificate Name"
                  />
                  <input
                    className="p-2 rounded-lg bg-bg-elev border border-border text-text flex-1"
                    value={cert.authority}
                    onChange={(e) => handleCertificateChange(index, 'authority', e.target.value)}
                    placeholder="Authority"
                  />
                  <input
                    className="p-2 rounded-lg bg-bg-elev border border-border text-text w-24"
                    value={cert.date}
                    onChange={(e) => handleCertificateChange(index, 'date', e.target.value)}
                    placeholder="Date"
                  />
                  <button type="button" onClick={() => handleRemoveCertificate(index)} className="p-2 bg-red-500/20 text-red-400 rounded-lg">
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button type="button" onClick={handleAddCertificate} className="mt-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 font-semibold text-sm">
              + Add Certificate
            </button>
          </div>

        </div>

        <div className="mt-4 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-full bg-bg-elev text-text hover:bg-border">Cancel</button>
          <button
            onClick={() => onSave(form)}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-primary to-primary-2 text-white font-semibold"
          >
            Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ---------------------- Confetti-like burst (SVG) ---------------------- */
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

export default OrganizerProfilePage;