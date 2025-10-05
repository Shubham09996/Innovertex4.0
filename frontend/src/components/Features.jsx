import React from 'react'

export default function Features() {
  const items = [
    { emoji: '👥', bg: 'bg-gradient-to-br from-purple-400/20 to-purple-700/20', shadow: 'shadow-lg shadow-purple-500/25', title: 'Team Collaboration', desc: 'Form teams and collaborate seamlessly with real-time tools.' },
    { emoji: '🎥', bg: 'bg-gradient-to-br from-pink-400/20 to-purple-500/20', shadow: 'shadow-lg shadow-purple-500/25', title: 'Virtual Mentorship', desc: 'Connect with industry experts and get guidance.' },
    { emoji: '💬', bg: 'bg-gradient-to-br from-cyan-400/20 to-blue-500/20', shadow: 'shadow-lg shadow-blue-500/25', title: 'Real-time Chat', desc: 'Stay connected with integrated chat and notifications.' },
    { emoji: '🏆', bg: 'bg-gradient-to-br from-emerald-400/20 to-green-500/20', shadow: 'shadow-lg shadow-green-500/25', title: 'Smart Judging', desc: 'Comprehensive evaluation with transparent leaderboards.' },
    { emoji: '✨', bg: 'bg-gradient-to-br from-yellow-300/20 to-amber-500/20', shadow: 'shadow-lg shadow-amber-500/25', title: 'Project Showcase', desc: 'Present innovations with rich media support.' },
    { emoji: '⚡', bg: 'bg-gradient-to-br from-purple-400/20 to-purple-700/20', shadow: 'shadow-lg shadow-purple-500/25', title: 'Lightning Fast', desc: 'Built for speed with real-time updates.' },
    { emoji: '🔒', bg: 'bg-gradient-to-br from-pink-400/20 to-purple-500/20', shadow: 'shadow-lg shadow-purple-500/25', title: 'Secure Platform', desc: 'Enterprise-grade security and data encryption.' },
    { emoji: '🌐', bg: 'bg-gradient-to-br from-cyan-400/20 to-blue-500/20', shadow: 'shadow-lg shadow-blue-500/25', title: 'Global Community', desc: 'Join hackers worldwide and build networks.' },
  ]
  return (
    <section className="py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-3xl sm:text-4xl text-center mb-3">Everything You Need to <span className="text-accent">Innovate</span></h2>
        <p className="text-center text-muted max-w-4xl mx-auto mb-6">
          Powerful tools and features designed to make your hackathon experience seamless, collaborative, and successful.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {items.map((f, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-6 flex flex-col items-start h-full justify-start transition-all duration-200 hover:translate-y-[-6px] hover:shadow-xl hover:border-primary/35 relative overflow-hidden min-h-[220px] group">
              <div className={`w-11 h-11 rounded-xl grid place-items-center ${f.bg} border border-border mb-3 ${f.shadow} group-hover:shadow-2xl group-hover:shadow-primary/35 transition-all duration-180`}>{f.emoji}</div>
              <div className="font-semibold mb-1">{f.title}</div>
              <div className="text-muted">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}