import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Features from '../components/Features'

export default function FeaturesPage({ theme, onToggleTheme }) {
  return (
    <div className="flex flex-col min-h-screen pt-[80px]">
      <NavBar theme={theme} onToggleTheme={onToggleTheme} />
      <div className="flex-grow">
        <section className="py-14 text-center">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="font-display text-5xl mb-3">Powerful Features for <span className="text-accent">Every Hacker</span></h1>
            <p className="text-muted max-w-4xl mx-auto">Discover the comprehensive suite of tools and features designed to make your hackathon experience seamless, collaborative, and successful.</p>
          </div>
        </section>
        {/* Reuse features grid from landing */}
        <Features />
        {/* Deep Dive grid - for brevity reuse Features again. In a full build, create a second, larger grid */}
        <section className="py-14">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-display text-4xl text-center mb-3">Deep Dive into <span className="text-accent">Our Capabilities</span></h2>
            <p className="text-muted text-center max-w-4xl mx-auto mb-6">Every feature is carefully crafted to enhance your hackathon journey, from ideation to implementation and beyond.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({length:12}).map((_,i)=> (
                <div key={i} className="bg-card border border-border rounded-xl p-6 flex flex-col items-start h-full min-h-[220px] transition-all duration-200 hover:translate-y-[-6px] hover:shadow-xl hover:border-primary/35 group">
                  <div className="w-11 h-11 rounded-xl grid place-items-center bg-gradient-to-br from-purple-400/20 to-purple-700/20 border border-border mb-3 group-hover:shadow-2xl group-hover:shadow-primary/35 transition-all duration-180">🏷</div>
                  <div className="font-semibold mb-1">Capability {i+1}</div>
                  <div className="text-muted">Detailed description of capability to mirror the screenshot layout.</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-14 text-center">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="font-display text-3xl mb-3">Ready to Experience the <span className="text-accent">Future of Hackathons?</span></h2>
              <p className="text-muted max-w-4xl mx-auto mb-5">Join thousands of developers, designers, and innovators who are already building the future with HackVerse.</p>
              <div className="flex justify-center gap-4">
                <a className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-2 text-white py-3 px-5 rounded-full font-semibold shadow-lg hover:translate-y-[-2px] hover:shadow-xl transition-all duration-160" href="#">Start Your Journey</a>
                <Link className="inline-flex items-center gap-2 bg-transparent border border-border text-text py-3 px-5 rounded-full font-semibold hover:border-primary/35 transition-all" to="/">Explore Hackathons</Link>
              </div>
            </div>
          </div>
        </section>
      <Footer />
      </div>
    </div>
  )
}
