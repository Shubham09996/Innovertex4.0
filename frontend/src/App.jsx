import './App.css'
import { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

function NavBar({ theme, onToggleTheme }) {
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <div className="brand">
          <span style={{display:'grid',placeItems:'center',width:32,height:32,borderRadius:8,background:'linear-gradient(135deg,#a78bfa,#7c3aed)'}}>⚡</span>
          <span>HackVerse</span>
        </div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <a href="#">Hackathons</a>
          <a href="#">Winners Gallery</a>
          <Link to="/features">Features</Link>
          <a href="#">Leaderboard</a>
          <a href="#">Community</a>
          <a href="#">Contact</a>
        </nav>
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">{theme === 'dark' ? '☾' : '☀'}</button>
          <a className="btn secondary" href="#">Login</a>
          <a className="btn" href="#">Sign Up</a>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero container">
      <h1>
        Build the Future at <span className="brand-accent">HackVerse</span>
      </h1>
      <p>
        Join the world's most innovative hackathon platform. Connect with brilliant minds, create groundbreaking solutions, and transform your ideas into reality.
      </p>
      <div className="cta-row">
        <a className="btn" href="#">Start Building →</a>
        <a className="btn secondary" href="#">Explore Hackathons</a>
      </div>
      <div className="stats-row">
        <div className="stat">
          <div className="badge" style={{width:48,height:48,margin:'0 auto 8px',borderRadius:12,display:'grid',placeItems:'center',background:'linear-gradient(135deg,#a78bfa22,#7c3aed22)',border:'1px solid var(--border)',boxShadow:'0 10px 30px rgba(124,58,237,0.25)'}}>👥</div>
          <div className="num">10K+</div>
          <div className="label">Active Hackers</div>
        </div>
        <div className="stat">
          <div className="badge" style={{width:48,height:48,margin:'0 auto 8px',borderRadius:12,display:'grid',placeItems:'center',background:'linear-gradient(135deg,#f472b622,#a855f722)',border:'1px solid var(--border)',boxShadow:'0 10px 30px rgba(168,85,247,0.25)'}}>⌘</div>
          <div className="num">500+</div>
          <div className="label">Projects Built</div>
        </div>
        <div className="stat">
          <div className="badge" style={{width:48,height:48,margin:'0 auto 8px',borderRadius:12,display:'grid',placeItems:'center',background:'linear-gradient(135deg,#22d3ee22,#60a5fa22)',border:'1px solid var(--border)',boxShadow:'0 10px 30px rgba(56,189,248,0.25)'}}>🏆</div>
          <div className="num">50+</div>
          <div className="label">Hackathons Hosted</div>
        </div>
      </div>
    </section>
  )
}

function Features() {
  const items = [
    { emoji: '👥', bg: 'linear-gradient(135deg,#a78bfa22,#7c3aed22)', shadow: '0 10px 30px rgba(124,58,237,0.25)', title: 'Team Collaboration', desc: 'Form teams, invite members, and collaborate seamlessly with real-time tools and shared workspaces.' },
    { emoji: '🎥', bg: 'linear-gradient(135deg,#f472b622,#a855f722)', shadow: '0 10px 30px rgba(168,85,247,0.25)', title: 'Virtual Mentorship', desc: 'Connect with industry experts through video calls, get guidance, and accelerate your project development.' },
    { emoji: '💬', bg: 'linear-gradient(135deg,#22d3ee22,#60a5fa22)', shadow: '0 10px 30px rgba(56,189,248,0.25)', title: 'Real-time Chat', desc: 'Stay connected with your team and mentors through integrated chat with file sharing and notifications.' },
    { emoji: '🏆', bg: 'linear-gradient(135deg,#34d39922,#10b98122)', shadow: '0 10px 30px rgba(16,185,129,0.25)', title: 'Smart Judging', desc: 'Comprehensive evaluation system with rubrics, scoring, and transparent leaderboards for fair competition.' },
    { emoji: '✨', bg: 'linear-gradient(135deg,#fde68a22,#f59e0b22)', shadow: '0 10px 30px rgba(245,158,11,0.25)', title: 'Project Showcase', desc: 'Present your innovations with rich media support, live demos, and detailed documentation tools.' },
    { emoji: '⚡', bg: 'linear-gradient(135deg,#a78bfa22,#7c3aed22)', shadow: '0 10px 30px rgba(124,58,237,0.25)', title: 'Lightning Fast', desc: 'Built for speed with real-time updates, instant notifications, and seamless user experience.' },
    { emoji: '🔒', bg: 'linear-gradient(135deg,#f472b622,#a855f722)', shadow: '0 10px 30px rgba(168,85,247,0.25)', title: 'Secure Platform', desc: 'Enterprise-grade security with role-based access, data encryption, and privacy protection.' },
    { emoji: '🌐', bg: 'linear-gradient(135deg,#22d3ee22,#60a5fa22)', shadow: '0 10px 30px rgba(56,189,248,0.25)', title: 'Global Community', desc: 'Join hackers worldwide, participate in international events, and build a global network.' },
  ]
  return (
    <section className="section container">
      <h2 className="section-title" style={{fontSize:36, textAlign:'center', marginBottom:14}}>Everything You Need to <span className="brand-accent">Innovate</span></h2>
      <p style={{textAlign:'center', color:'var(--muted)', maxWidth:900, margin:'0 auto 24px'}}>
        Powerful tools and features designed to make your hackathon experience seamless, collaborative, and successful.
      </p>
      <div className="features-grid">
        {items.map((f, i) => (
          <div key={i} className="card">
            <div className="badge" style={{width:44,height:44,borderRadius:12,display:'grid',placeItems:'center',background:f.bg,border:'1px solid var(--border)',marginBottom:12,boxShadow:f.shadow}}>{f.emoji}</div>
            <div style={{fontWeight:600, marginBottom:6}}>{f.title}</div>
            <div style={{color:'var(--muted)'}}>{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Testimonials() {
  const list = [
    {
      quote: "HackVerse transformed how I approach hackathons. The collaboration tools and mentorship features helped our team build something incredible in just 48 hours.",
      name: 'Sarah Chen', role: 'Full Stack Developer at TechCorp'
    },
    {
      quote: "As an organizer, HackVerse made managing our 500+ participant hackathon seamless. The judging system and real-time analytics were game-changers.",
      name: 'Marcus Rodriguez', role: 'Product Manager at InnovateLab'
    },
    {
      quote: "The mentorship experience on HackVerse is unmatched. I\'ve guided over 20 teams and watched them grow from ideas to production-ready solutions.",
      name: 'Dr. Emily Watson', role: 'AI Research Lead at DataMind'
    }
  ]
  return (
    <section className="section container">
      <h2 className="section-title" style={{fontSize:36, textAlign:'center', marginBottom:14}}>Loved by <span className="brand-accent">Innovators</span></h2>
      <p style={{textAlign:'center', color:'var(--muted)', maxWidth:900, margin:'0 auto 24px'}}>
        Join thousands of developers, designers, and entrepreneurs who have transformed their ideas into reality with HackVerse.
      </p>
      <div className="testimonials">
        {list.map((t, i) => (
          <div key={i} className="card">
            <div style={{fontSize:22, marginBottom:6}}>❝</div>
            <div style={{color:'var(--muted)'}}>{`"${t.quote}"`}</div>
            <div style={{display:'flex',alignItems:'center',gap:12,marginTop:16}}>
              <div style={{width:44,height:44,borderRadius:999,background:'#222'}} />
              <div>
                <div style={{fontWeight:600}}>{t.name}</div>
                <div style={{color:'var(--muted)', fontSize:14}}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Sponsors() {
  const SponsorBox = ({label}) => (
    <div className="card sponsor-card">
      <div style={{color:'var(--muted)'}}>{label}</div>
    </div>
  )
  return (
    <section className="section sponsors">
      <div className="container">
        <h2 className="section-title" style={{fontSize:36, textAlign:'center', marginBottom:24}}>Trusted by <span className="brand-accent">Industry Leaders</span></h2>
        <div className="sponsors-tier">PLATINUM SPONSORS</div>
        <div className="sponsor-grid" style={{gridTemplateColumns:'1fr', maxWidth:560, margin:'0 auto 16px'}}>
          <SponsorBox label="TechFlow" />
        </div>
        <div className="sponsors-tier">GOLD SPONSORS</div>
        <div className="sponsor-grid" style={{maxWidth:760, margin:'0 auto 16px'}}>
          <SponsorBox label="InnovateX" />
          <SponsorBox label="CodeLabs" />
        </div>
        <div className="sponsors-tier">SILVER SPONSORS</div>
        <div className="sponsor-grid" style={{maxWidth:980, margin:'0 auto'}}>
          <SponsorBox label="DataCore" />
          <SponsorBox label="CloudTech" />
          <SponsorBox label="DevTools" />
        </div>
        <div className="sponsors-cta" style={{textAlign:'center'}}>
          <div style={{marginBottom:12}}>Interested in sponsoring our next hackathon?</div>
          <a className="btn" href="#">Become a Sponsor</a>
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="cta-band">
      <div className="container" style={{textAlign:'center'}}>
        <div style={{marginBottom:12}}>Interested in sponsoring our next hackathon?</div>
        <a className="btn" href="#">Become a Sponsor</a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container section footer-grid">
        <div>
          <div className="brand" style={{marginBottom:10}}>
            <span style={{display:'grid',placeItems:'center',width:32,height:32,borderRadius:8,background:'linear-gradient(135deg,#a78bfa,#7c3aed)'}}>⚡</span>
            <span>HackVerse</span>
          </div>
          <div style={{color:'var(--muted)'}}>Empowering innovation through collaborative hackathons. Join thousands of developers, designers, and entrepreneurs building the future together.</div>
        </div>
        <div>
          <div style={{fontWeight:600, marginBottom:8}}>Quick Links</div>
          <div style={{display:'grid', gap:8, color:'var(--muted)'}}>
            <a href="#">Home</a>
            <a href="#">Hackathons</a>
            <a href="#">Winners Gallery</a>
            <a href="#">Features</a>
            <a href="#">Leaderboard</a>
          </div>
        </div>
        <div>
          <div style={{fontWeight:600, marginBottom:8}}>Support</div>
          <div style={{display:'grid', gap:8, color:'var(--muted)'}}>
            <a href="#">FAQ</a>
            <a href="#">Contact</a>
            <a href="#">Help Center</a>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
        <div>
          <div style={{fontWeight:600, marginBottom:8}}>Stay Updated</div>
          <div style={{color:'var(--muted)', marginBottom:12}}>Get notified about new hackathons, features, and opportunities.</div>
          <div style={{display:'flex', gap:8}}>
            <input placeholder="Enter your email" style={{flex:1, background:'transparent', border:'1px solid var(--border)', borderRadius:999, padding:'12px 14px', color:'var(--text)'}} />
            <button className="btn" style={{padding:'12px 16px'}}>✉</button>
          </div>
        </div>
      </div>
      <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 0 24px',color:'var(--muted)'}}>
        <div>© 2024 HackVerse. All rights reserved. Built with ❤ for innovators.</div>
        <div style={{display:'flex',gap:14}}>
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  )
}

function LandingPage() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('hv-theme')
    if (saved) return saved
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
    return prefersLight ? 'light' : 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') root.setAttribute('data-theme', 'light')
    else root.removeAttribute('data-theme')
    localStorage.setItem('hv-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))

  return (
    <div className="page">
      <NavBar theme={theme} onToggleTheme={toggleTheme} />
      <Hero />
      <Features />
      <Testimonials />
      <Sponsors />
      <Footer />
    </div>
  )
}

function FeaturesPage() {
  return (
    <div className="page">
      <NavBar theme={'dark'} onToggleTheme={() => {}} />
      <section className="section container" style={{textAlign:'center'}}>
        <h1 className="section-title" style={{fontSize:56, marginBottom:12}}>Powerful Features for <span className="brand-accent">Every Hacker</span></h1>
        <p className="muted" style={{maxWidth:900, margin:'0 auto'}}>Discover the comprehensive suite of tools and features designed to make your hackathon experience seamless, collaborative, and successful.</p>
      </section>
      {/* Reuse features grid from landing */}
      <Features />
      {/* Deep Dive grid - for brevity reuse Features again. In a full build, create a second, larger grid */}
      <section className="section container">
        <h2 className="section-title" style={{textAlign:'center', fontSize:44, marginBottom:12}}>Deep Dive into <span className="brand-accent">Our Capabilities</span></h2>
        <p className="muted" style={{textAlign:'center', maxWidth:900, margin:'0 auto 24px'}}>Every feature is carefully crafted to enhance your hackathon journey, from ideation to implementation and beyond.</p>
        <div className="features-grid">
          {Array.from({length:12}).map((_,i)=> (
            <div key={i} className="card">
              <div className="badge" style={{width:44,height:44,borderRadius:12,display:'grid',placeItems:'center',background:'linear-gradient(135deg,#a78bfa22,#7c3aed22)',border:'1px solid var(--border)',marginBottom:12}}>🏷</div>
              <div style={{fontWeight:600, marginBottom:6}}>Capability {i+1}</div>
              <div className="muted">Detailed description of capability to mirror the screenshot layout.</div>
            </div>
          ))}
        </div>
      </section>
      <section className="section container" style={{textAlign:'center'}}>
        <div className="card" style={{padding:32}}>
          <h2 className="section-title" style={{fontSize:36, marginBottom:12}}>Ready to Experience the <span className="brand-accent">Future of Hackathons?</span></h2>
          <p className="muted" style={{maxWidth:900, margin:'0 auto 20px'}}>Join thousands of developers, designers, and innovators who are already building the future with HackVerse.</p>
          <div className="cta-row">
            <a className="btn" href="#">Start Your Journey</a>
            <Link className="btn secondary" to="/">Explore Hackathons</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/features" element={<FeaturesPage />} />
    </Routes>
  )
}
