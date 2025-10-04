import React from 'react'

export default function Testimonials() {
  const list = [
    {
      quote: "HackVerse transformed how I approach hackathons. The collaboration tools and mentorship features helped our team build something incredible in just 48 hours.",
      name: 'Sarah Chen', role: 'Full Stack Developer at TechCorp',
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      quote: "As an organizer, HackVerse made managing our 500+ participant hackathon seamless. The judging system and real-time analytics were game-changers.",
      name: 'Marcus Rodriguez', role: 'Product Manager at InnovateLab',
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      quote: "The mentorship experience on HackVerse is unmatched. I\'ve guided over 20 teams and watched them grow from ideas to production-ready solutions.",
      name: 'Dr. Emily Watson', role: 'AI Research Lead at DataMind',
      image: 'https://randomuser.me/api/portraits/women/68.jpg'
    }
  ]
  return (
    <section className="py-14">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-4xl text-center mb-3">Loved by <span className="text-accent">Innovators</span></h2>
        <p className="text-center text-muted max-w-4xl mx-auto mb-6">
          Join thousands of developers, designers, and entrepreneurs who have transformed their ideas into reality with HackVerse.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {list.map((t, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-6 transition-all duration-200 hover:translate-y-[-4px] hover:shadow-xl hover:border-primary/30">
              <div className="text-2xl mb-1">❝</div>
              <div className="text-muted">{`"${t.quote}"`}</div>
              <div className="flex items-center gap-3 mt-4">
                <img 
                  src={t.image} 
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-border"
                />
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-muted text-sm">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}