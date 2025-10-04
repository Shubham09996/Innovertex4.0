import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import Sponsors from '../components/Sponsors'
import CTA from '../components/CTA'

export default function LandingPage({ theme, onToggleTheme }) {
  return (
    <div className="flex flex-col min-h-screen pt-[80px]">
      <NavBar theme={theme} onToggleTheme={onToggleTheme} />
      <div className="flex-grow">
        <Hero />
        <Features />
        <Testimonials />
        <Sponsors />
        <Footer />
      </div>
    </div>
  )
}
