import React from 'react'

export default function Hero() {
  return (
    <section className="py-14 text-center">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="font-display text-6xl leading-tight mx-auto mb-3 tracking-tight md:text-7xl lg:text-8xl">
          Build the Future at <span className="bg-gradient-to-r from-purple-400 to-purple-700 text-transparent bg-clip-text">HackVerse</span>
        </h1>
        <p className="max-w-4xl mx-auto mb-6 text-lg text-muted">
          Join the world's most innovative hackathon platform. Connect with brilliant minds, create groundbreaking solutions, and transform your ideas into reality.
        </p>
        <div className="flex justify-center gap-4 mb-6">
          <a className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-2 text-white py-3.5 px-5 rounded-full font-semibold shadow-lg hover:translate-y-[-2px] hover:shadow-xl transition-all duration-160" href="#">Start Building →</a>
          <a className="inline-flex items-center gap-2 bg-transparent border border-border text-text py-3.5 px-5 rounded-full font-semibold hover:border-primary/35 transition-all" href="#">Explore Hackathons</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mt-6 justify-items-center">
          <div className="text-center p-5 border border-border rounded-xl bg-bg-elev transition-all duration-180 hover:translate-y-[-4px] hover:shadow-lg hover:border-primary/30">
            <div className="w-12 h-12 mx-auto mb-2 rounded-xl grid place-items-center bg-gradient-to-br from-purple-400/20 to-purple-700/20 border border-border shadow-md group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-180">👥</div>
            <div className="text-3xl font-bold text-purple-300">10K+</div>
            <div className="text-muted mt-1.5">Active Hackers</div>
          </div>
          <div className="text-center p-5 border border-border rounded-xl bg-bg-elev transition-all duration-180 hover:translate-y-[-4px] hover:shadow-lg hover:border-primary/30">
            <div className="w-12 h-12 mx-auto mb-2 rounded-xl grid place-items-center bg-gradient-to-br from-pink-400/20 to-purple-500/20 border border-border shadow-md group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-180">⌘</div>
            <div className="text-3xl font-bold text-purple-300">500+</div>
            <div className="text-muted mt-1.5">Projects Built</div>
          </div>
          <div className="text-center p-5 border border-border rounded-xl bg-bg-elev transition-all duration-180 hover:translate-y-[-4px] hover:shadow-lg hover:border-primary/30">
            <div className="w-12 h-12 mx-auto mb-2 rounded-xl grid place-items-center bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-border shadow-md group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-180">🏆</div>
            <div className="text-3xl font-bold text-purple-300">50+</div>
            <div className="text-muted mt-1.5">Hackathons Hosted</div>
          </div>
        </div>
      </div>
    </section>
  )
}
