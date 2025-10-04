import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'

export default function LandingPage({ theme, onToggleTheme }) {
  return (
    <div className="flex flex-col min-h-screen pt-[80px]">
      <div className="flex-grow">
        <Hero />
        <Features />
        <Testimonials />
      </div>
    </div>
  )
}