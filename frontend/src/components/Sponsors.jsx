import React from 'react'

export default function Sponsors() {
  const SponsorBox = ({label}) => (
    <div className="bg-card border border-border rounded-xl p-6 w-full max-w-sm h-24 grid place-items-center">
      <div className="text-muted">{label}</div>
    </div>
  )
  return (
    <section className="py-14 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-4xl text-center mb-6">Trusted by <span className="text-accent">Industry Leaders</span></h2>
        <div className="text-center mb-3 text-muted tracking-wide text-sm">PLATINUM SPONSORS</div>
        <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto mb-4">
          <SponsorBox label="TechFlow" />
        </div>
        <div className="text-center mb-3 text-muted tracking-wide text-sm">GOLD SPONSORS</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-4">
          <SponsorBox label="InnovateX" />
          <SponsorBox label="CodeLabs" />
        </div>
        <div className="text-center mb-3 text-muted tracking-wide text-sm">SILVER SPONSORS</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <SponsorBox label="DataCore" />
          <SponsorBox label="CloudTech" />
          <SponsorBox label="DevTools" />
        </div>
        <div className="text-center max-w-3xl mx-auto mt-5">
          <div className="mb-3">Interested in sponsoring our next hackathon?</div>
          <a className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-2 text-white py-3 px-5 rounded-full font-semibold shadow-lg hover:translate-y-[-2px] hover:shadow-xl transition-all duration-160" href="#">Become a Sponsor</a>
        </div>
      </div>
    </section>
  )
}
