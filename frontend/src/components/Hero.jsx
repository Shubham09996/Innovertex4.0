import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'HackVerse';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Typing aur deleting ki speed
    const typingSpeed = isDeleting ? 75 : 150;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing phase
        if (currentIndex < fullText.length) {
          setDisplayText(prev => prev + fullText[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        } else {
          // FIX: Wait time ko 1000ms se 500ms kar diya hai
          setTimeout(() => setIsDeleting(true), 500);
        }
      } else {
        // Deleting phase
        if (currentIndex > 0) {
          setDisplayText(prev => prev.slice(0, -1));
          setCurrentIndex(prev => prev - 1);
        } else {
          // Agle cycle ke liye reset
          setIsDeleting(false);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting]);

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.section 
      className="py-14 text-center"
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.h1 
          className="font-display text-6xl leading-tight mx-auto mb-3 tracking-tight md:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Build the Future at
        </motion.h1>

        <h1 className="font-display text-6xl leading-tight mx-auto mb-3 tracking-tight md:text-7xl lg:text-8xl">
          <span className="bg-gradient-to-r from-purple-400 to-purple-700 text-transparent bg-clip-text">
            <span className="inline-block w-full max-w-[300px] sm:max-w-[360px] md:max-w-[500px] text-left">
              {displayText}
              {/* FIX: Asli typing pointer jo blink karega */}
              <span 
                className="inline-block w-1 h-16 md:h-20 bg-purple-500 animate-pulse ml-2 align-bottom"
                aria-hidden="true"
              ></span>
            </span>
          </span>
        </h1>
        
        <motion.div variants={containerVariants}>
          <motion.p className="max-w-4xl mx-auto mb-6 text-lg text-muted" variants={itemVariants}>
            Join the world's most innovative hackathon platform. Connect with brilliant minds, create groundbreaking solutions, and transform your ideas into reality.
          </motion.p>
          
          <motion.div className="flex flex-col sm:flex-row justify-center gap-4 mb-6" variants={itemVariants}>
            <a className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-2 text-white py-3.5 px-5 rounded-full font-semibold shadow-lg hover:translate-y-[-2px] hover:shadow-xl transition-all duration-160" href="#">Start Building →</a>
            <a className="inline-flex items-center gap-2 bg-transparent border border-border text-text py-3.5 px-5 rounded-full font-semibold hover:border-primary/35 transition-all" href="#">Explore Hackathons</a>
          </motion.div>
          
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mt-6 justify-items-center" variants={itemVariants}>
            {/* Stats Cards */}
            <div className="text-center w-full p-5 border border-border rounded-xl bg-bg-elev transition-all duration-180 hover:translate-y-[-4px] hover:shadow-lg hover:border-primary/30">
              <div className="w-12 h-12 mx-auto mb-2 rounded-xl grid place-items-center bg-gradient-to-br from-purple-400/20 to-purple-700/20 border border-border shadow-md">👥</div>
              <div className="text-3xl font-bold text-purple-300">10K+</div>
              <div className="text-muted mt-1.5">Active Hackers</div>
            </div>
            <div className="text-center w-full p-5 border border-border rounded-xl bg-bg-elev transition-all duration-180 hover:translate-y-[-4px] hover:shadow-lg hover:border-primary/30">
              <div className="w-12 h-12 mx-auto mb-2 rounded-xl grid place-items-center bg-gradient-to-br from-pink-400/20 to-purple-500/20 border border-border shadow-md">⌘</div>
              <div className="text-3xl font-bold text-purple-300">500+</div>
              <div className="text-muted mt-1.5">Projects Built</div>
            </div>
            <div className="text-center w-full p-5 border border-border rounded-xl bg-bg-elev transition-all duration-180 hover:translate-y-[-4px] hover:shadow-lg hover:border-primary/30">
              <div className="w-12 h-12 mx-auto mb-2 rounded-xl grid place-items-center bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-border shadow-md">🏆</div>
              <div className="text-3xl font-bold text-purple-300">50+</div>
              <div className="text-muted mt-1.5">Hackathons Hosted</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}