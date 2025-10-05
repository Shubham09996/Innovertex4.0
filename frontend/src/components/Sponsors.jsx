import React from 'react';
import { motion } from 'framer-motion';
import { Gem, Award, Star, Handshake } from 'lucide-react';

// A structured object to hold sponsor data with corrected, reliable image links.
const sponsors = {
  platinum: [
    {
      name: 'QuantumLeap',
      logo: 'https://logoipsum.com/289.svg',
      description: 'AI & Machine Learning Pioneers',
    },
  ],
  gold: [
    {
      name: 'NexusSphere',
      logo: 'https://logoipsum.com/243.svg',
      description: 'Next-Gen Cloud Solutions',
    },
    {
      name: 'InnovateX',
      logo: 'https://logoipsum.com/251.svg',
      description: 'Empowering Digital Transformation',
    },
  ],
  silver: [
    {
      name: 'DataWeave',
      logo: 'https://logoipsum.com/258.svg',
      description: 'Intelligent Data Platforms',
    },
    {
      name: 'CodeHarbor',
      logo: 'https://logoipsum.com/264.svg',
      description: 'Secure Developer Tooling',
    },
    {
      name: 'Velocity',
      logo: 'https://logoipsum.com/265.svg',
      description: 'High-Performance APIs',
    },
  ],
};

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Sponsors() {
  const SponsorBox = ({ logoSrc, companyName, description }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5, scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0, 0.1)" }}
      className="bg-card border border-border rounded-xl p-6 flex flex-col items-center justify-center text-center h-full"
    >
      <img src={logoSrc} alt={`${companyName} logo`} className="h-10 object-contain mb-4" />
      <div className="text-text font-semibold text-lg">{companyName}</div>
      <div className="text-muted text-sm mt-1">{description}</div>
    </motion.div>
  );

  const SponsorTier = ({ title, icon, sponsors, gridClass }) => (
    <motion.div variants={itemVariants} className="w-full">
      <div className="flex items-center justify-center gap-2 mb-4 text-muted tracking-wide text-sm font-semibold">
        {icon}
        {title}
      </div>
      <div className={`grid gap-4 ${gridClass} mx-auto`}>
        {sponsors.map((sponsor) => (
          <SponsorBox
            key={sponsor.name}
            companyName={sponsor.name}
            logoSrc={sponsor.logo}
            description={sponsor.description}
          />
        ))}
      </div>
    </motion.div>
  );

  return (
    <section className="py-20 bg-transparent">
      <motion.div
        className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="text-center">
          <h2 className="font-display text-3xl sm:text-4xl mb-4">
            Trusted by <span className="text-primary">Industry Leaders</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-base sm:text-lg">
            Our hackathons are powered by the world's most innovative companies. We're proud to partner with them to foster the next generation of tech talent.
          </p>
        </motion.div>

        <SponsorTier
          title="PLATINUM SPONSORS"
          icon={<Gem size={16} className="text-cyan-400" />}
          sponsors={sponsors.platinum}
          gridClass="grid-cols-1 max-w-sm"
        />

        <SponsorTier
          title="GOLD SPONSORS"
          icon={<Award size={16} className="text-amber-400" />}
          sponsors={sponsors.gold}
          gridClass="sm:grid-cols-2 max-w-3xl"
        />

        <SponsorTier
          title="SILVER SPONSORS"
          icon={<Star size={16} className="text-slate-400" />}
          sponsors={sponsors.silver}
          gridClass="sm:grid-cols-2 lg:grid-cols-3 max-w-5xl"
        />

        <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mt-8 border-t border-border pt-10 w-full">
          <h3 className="text-2xl font-bold mb-3">Ready to Empower Innovation?</h3>
          <p className="text-muted mb-6">
            Join us as a sponsor and connect with thousands of talented developers, designers, and innovators from around the globe.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-2 text-white py-3 px-6 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            href="#"
          >
            <Handshake size={20} />
            Become a Sponsor
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
