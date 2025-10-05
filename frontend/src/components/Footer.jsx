import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-elev">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-y-8 md:gap-8">
        <div>
          <div className="flex items-center gap-2 font-display font-bold text-lg mb-4">
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-purple-700">⚡</span>
            <span>HackVerse</span>
          </div>
          <div className="text-muted">Empowering innovation through collaborative hackathons. Join thousands of developers, designers, and entrepreneurs building the future together.</div>
        </div>
        <div>
          <div className="font-semibold mb-3">Quick Links</div>
          <div className="grid gap-2 text-muted">
            <a href="#" className="hover:text-primary transition-colors">Home</a>
            <a href="#" className="hover:text-primary transition-colors">Hackathons</a>
            <a href="#" className="hover:text-primary transition-colors">Winners Gallery</a>
            <a href="#" className="hover:text-primary transition-colors">Features</a>
            <a href="#" className="hover:text-primary transition-colors">Leaderboard</a>
          </div>
        </div>
        <div>
          <div className="font-semibold mb-3">Support</div>
          <div className="grid gap-2 text-muted">
            <a href="#" className="hover:text-primary transition-colors">FAQ</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
            <a href="#" className="hover:text-primary transition-colors">Help Center</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          </div>
        </div>
        <div>
          <div className="font-semibold mb-3">Stay Updated</div>
          <div className="text-muted mb-4">Get notified about new hackathons, features, and opportunities.</div>
          <div className="flex gap-2">
            <input placeholder="Enter your email" className="flex-1 bg-transparent border border-border rounded-full py-3 px-4 text-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
            <button className="bg-primary text-white py-3 px-4 rounded-full font-semibold hover:bg-primary-dark transition-colors">✉</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center text-muted text-center sm:text-left">
        <div className="mb-2 sm:mb-0">© 2025 HackVerse. All rights reserved. Built with ❤ for innovators.</div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  )
}