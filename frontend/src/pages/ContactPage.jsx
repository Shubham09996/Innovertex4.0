/* ContactPage.jsx
  Dependencies: react, framer-motion, lucide-react
  TailwindCSS must be configured in your project.
*/

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, User, MessageSquare, Send, Github, Linkedin, Twitter, CheckCircle } from 'lucide-react';

// You can reuse these components from your AboutPage.jsx
// For this example, they are included here to make the file standalone.

/* ---------------------------
   Particle Background Canvas
   --------------------------- */
const Particles = () => {
  const ref = useRef();
  useEffect(() => {
    // Effect logic from AboutPage.jsx...
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let particles = [];
    const icons = ["💻", "🚀", "💡", "✨"];
    function init() {
      particles = [];
      for (let i = 0; i < Math.floor((w * h) / 90000); i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 10 + Math.random() * 18,
          vy: 0.2 + Math.random() * 0.6,
          icon: icons[Math.floor(Math.random() * icons.length)],
          alpha: 0.2 + Math.random() * 0.6,
        });
      }
    }
    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      init();
    }
    function animate() {
      if(!ctx) return;
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.y -= p.vy;
        if (p.y < -50) {
          p.y = h + 50;
          p.x = Math.random() * w;
        }
        ctx.globalAlpha = p.alpha;
        ctx.font = `${Math.floor(p.r)}px sans-serif`;
        ctx.fillText(p.icon, p.x, p.y);
      });
      requestAnimationFrame(animate);
    }
    init();
    animate();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  return <canvas ref={ref} className="pointer-events-none fixed inset-0 -z-10" aria-hidden />;
};

/* ---------------------------
   Confetti mini (canvas burst)
   --------------------------- */
function burstConfetti() {
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.inset = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.zIndex = "9999";
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const pieces = [];
  const colors = ["#818cf8", "#38bdf8", "#4ade80", "#a78bfa", "#f97316"];
  for (let i = 0; i < 80; i++) {
    pieces.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 12,
      vy: Math.random() * -14 - 4,
      r: 4 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 90 + Math.random() * 50,
      alpha: 1,
    });
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p) => {
      p.vy += 0.4;
      p.vx *= 0.98;
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 1;
      p.alpha = Math.max(0, p.life / 140);
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.vx * 0.1) % Math.PI);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r);
      ctx.restore();
    });
    if (pieces.some((p) => p.life > 0)) {
      requestAnimationFrame(draw);
    } else {
      document.body.removeChild(canvas);
    }
  }
  draw();
}

const socialLinks = [
    { icon: Github, href: '#', name: 'GitHub' },
    { icon: Linkedin, href: '#', name: 'LinkedIn' },
    { icon: Twitter, href: '#', name: 'Twitter' },
];


export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    setStatus('sending');
    // --- Mock API call ---
    setTimeout(() => {
      // Simulate success
      setStatus('success');
      burstConfetti();
      // Reset form after a delay
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setStatus('idle');
      }, 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-bg text-text pt-0 font-sans">
      <Particles />

      <main className="max-w-6xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Get In Touch
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted">
            Have a question, a proposal, or just want to say hi? Send us a transmission. We're always excited to connect with fellow innovators.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 grid md:grid-cols-5 gap-8 md:gap-12 bg-card/50 border border-border rounded-2xl p-8 backdrop-blur-lg shadow-xl"
        >
          {/* Left Side Info */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-text">Contact Information</h2>
            <p className="mt-2 text-muted">Find us on other channels or drop a direct email.</p>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:contact@innovortex.com" className="text-muted hover:text-primary transition-colors">contact@innovortex.com</a>
              </div>
               <div className="flex items-center gap-3">
                <div className='w-5 h-5'></div>
                <p className="text-muted">Innovortex HQ, Delhi, India</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
                <h3 className="font-semibold text-text">Follow Us</h3>
                <div className="flex gap-4 mt-4">
                    {socialLinks.map((link, i) => (
                        <motion.a 
                            key={i}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -3 }}
                            className="p-3 bg-bg-elev border border-border rounded-full text-muted hover:text-primary hover:border-primary/50 transition-all"
                        >
                            <link.icon className="w-5 h-5" />
                        </motion.a>
                    ))}
                </div>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="md:col-span-3">
            <AnimatePresence mode="wait">
              {status !== 'success' ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <InputField icon={User} type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleInputChange} required />
                  <InputField icon={Mail} type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleInputChange} required />
                  <TextareaField icon={MessageSquare} name="message" placeholder="Your Message" value={formData.message} onChange={handleInputChange} required />

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-primary-2 text-white font-semibold shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? 'Sending Transmission...' : 'Launch Message'}
                    <Send className="w-5 h-5" />
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  className="text-center flex flex-col items-center justify-center h-full"
                >
                  <CheckCircle className="w-16 h-16 text-green-400" />
                  <h3 className="mt-4 text-2xl font-bold">Transmission Sent!</h3>
                  <p className="mt-2 text-muted">Thanks for reaching out. We'll get back to you soon.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

// Helper components for form fields for a cleaner look
const InputField = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
      <Icon className="w-5 h-5" />
    </div>
    <input
      {...props}
      className="w-full bg-bg-elev border border-border rounded-full py-3 pr-4 pl-12 text-text placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
    />
  </div>
);

const TextareaField = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <div className="absolute left-4 top-4 text-muted pointer-events-none">
      <Icon className="w-5 h-5" />
    </div>
    <textarea
      {...props}
      rows={5}
      className="w-full bg-bg-elev border border-border rounded-2xl py-3 pr-4 pl-12 text-text placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
    />
  </div>
);