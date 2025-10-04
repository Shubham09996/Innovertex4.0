/* AboutPage.jsx
  Dependencies: react, framer-motion, lucide-react (or other icon library)
  TailwindCSS must be configured in your project.
  Assumes a ThemeContext and react-router-dom are set up.
*/

import React, { useEffect, useRef, useState, useContext } from "react";
import { motion, useAnimation } from "framer-motion";
import { useNavigate } from 'react-router-dom';

// Assuming you have a Navbar component and a ThemeContext
// import Navbar from "../components/Navbar";
// import { ThemeContext } from '../contexts/ThemeContext';
import NavBar from '../components/NavBar';

const ThemeContext = React.createContext({ theme: 'dark' });

const TEAM = [
  {
    name: "Shubham Gupta",
    role: "Team Leader • Full Stack Architect",
    line: "Architecting the future of hackathons, one line of code at a time.",
    avatarSeed: "Shubham",
    side: "left",
  },
  {
    name: "Sneha Gupta",
    role: "UI/UX & Documentation",
    line: "Crafting intuitive designs and clear guides for a seamless experience.",
    avatarSeed: "Sneha",
    side: "right",
  },
  {
    name: "Om Kumar Jha",
    role: "Frontend Developer",
    line: "Bringing static designs to life with fluid animations and clean code.",
    avatarSeed: "OmKumar",
    side: "left",
  },
];

/* ---------------------------
   Helper: useCountUp hook
   --------------------------- */
function useCountUp(end, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const diff = end - start;
    const stepTime = Math.max(Math.floor(duration / Math.abs(diff || 1)), 10);
    const timer = setInterval(() => {
      start += Math.ceil(diff / (duration / stepTime));
      if ((diff > 0 && start >= end) || (diff < 0 && start <= end)) {
        start = end;
        clearInterval(timer);
      }
      setValue(start);
    }, stepTime);
    return () => clearInterval(timer);
  }, [end, duration]);
  return value;
}

/* ---------------------------
   Particle Background Canvas
   --------------------------- */
const Particles = () => {
  const ref = useRef();
  useEffect(() => {
    const canvas = ref.current;
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
  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden
    />
  );
};

/* ---------------------------
   Glowing Cursor Trail
   --------------------------- */
const CursorTrail = () => {
  const ref = useRef();
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const dots = [];
    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    function mousemove(e) {
      dots.push({
        x: e.clientX,
        y: e.clientY,
        life: 30 + Math.random() * 10,
        size: 6 + Math.random() * 6,
      });
      if (dots.length > 120) dots.shift();
    }
    function render() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        d.life -= 1;
        d.y -= 0.2;
        ctx.beginPath();
        const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.size);
        g.addColorStop(0, "rgba(187, 134, 252, 0.9)"); // primary color (BB86FC)
        g.addColorStop(0.5, "rgba(159, 92, 247, 0.4)"); // primary-2 color (9F5CF7)
        g.addColorStop(1, "rgba(159, 92, 247, 0)");
        ctx.fillStyle = g;
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fill();
      }
      while (dots.length && dots[0].life < 0) dots.shift();
      requestAnimationFrame(render);
    }
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("resize", resize);
    render();
    return () => {
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={ref} className="pointer-events-none fixed inset-0 -z-10" />;
};

/* ---------------------------
   Confetti mini (canvas burst)
   --------------------------- */
function burstConfetti() {
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.left = 0;
  canvas.style.top = 0;
  canvas.style.zIndex = "9999";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const pieces = [];
  const colors = ["#BB86FC", "#9F5CF7", "#20C997", "#A78BFA", "#F97316"]; // Using theme primary, primary-2, green for success, and other accent colors
  for (let i = 0; i < 80; i++) {
    pieces.push({
      x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
      y: window.innerHeight / 3 + (Math.random() - 0.5) * 100,
      vx: (Math.random() - 0.5) * 10,
      vy: Math.random() * -8 - 2,
      r: 4 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 90 + Math.random() * 50,
    });
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p) => {
      p.vy += 0.3;
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 1;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.vx * 0.1) % Math.PI);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6);
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

/* ---------------------------
   Team Timeline Item
   --------------------------- */
const TeamItem = ({ member, index }) => {
  const controls = useAnimation();
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) controls.start("visible");
        });
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => {
      if(ref.current) obs.unobserve(ref.current);
    };
  }, [controls]);

  const isLeft = member.side === "left";
  const cardAnim = {
    hidden: { opacity: 0, x: isLeft ? -100 : 100, scale: 0.8 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 1.2, delay: index * 0.3, type: "spring", stiffness: 80 } },
  };

  return (
    <div ref={ref} className={`relative max-w-xl w-full ${isLeft ? 'md:mr-auto' : 'md:ml-auto'}`}>
      <motion.div
        initial="hidden"
        animate={controls}
        variants={cardAnim}
        className="transform hover:scale-[1.02] transition-transform duration-300 ease-out"
      >
        <div className={`absolute top-8 ${isLeft ? 'md:right-[-12px]' : 'md:left-[-12px]'} hidden md:block`}>
          <div className="w-5 h-5 rounded-full bg-primary border-4 border-border shadow-lg z-10" />
        </div>
        <div className="bg-card backdrop-blur-md border border-border rounded-2xl p-6 md:p-8 shadow-xl flex gap-4 items-start">
          <img
            src={`https://api.dicebear.com/7.x/bottts/svg?seed=${member.avatarSeed}`}
            alt={member.name}
            className="w-20 h-20 rounded-full border-4 border-primary/60 object-cover"
          />
          <div>
            <h4 className="text-xl font-bold text-text">{member.name}</h4>
            <span className="inline-flex items-center text-sm bg-primary/15 text-primary px-2 py-0.5 rounded-full mt-1">
              {member.role}
            </span>
            <p className="mt-2 text-muted">{member.line}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ---------------------------
   Main About Page component
   --------------------------- */
export default function AboutPage() {
  const hackathonsHosted = useCountUp(50);
  const projectsSubmitted = useCountUp(500);
  const developersOnboard = useCountUp(10000);
  const { theme, onToggleTheme, isLoggedIn } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen pt-10 bg-bg text-text`}>
      <NavBar theme={theme} onToggleTheme={onToggleTheme} isLoggedIn={isLoggedIn} />
      <Particles />

      {/* HERO */}
      <header className="min-h-[68vh] flex items-center">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`text-4xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-2`}
            >
              Innovortex 4.0 — The Ultimate Hackathon Platform
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-lg text-muted max-w-xl"
            >
              Transforming ideas into reality. A modern, engaging, and reliable platform for organizers to host events and for participants to showcase their skills.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-6 flex gap-4"
            >
              <button
                onClick={() => {
                  burstConfetti();
                  navigate('/participant/hackathons'); // Navigate to /participant/hackathons
                }}
                className="px-5 py-3 rounded-full bg-gradient-to-r from-primary to-primary-2 text-white font-semibold shadow-lg hover:scale-[1.02] transform transition"
              >
                Explore Hackathons
              </button>

              <button
                onClick={() => document.querySelector("#team")?.scrollIntoView({ behavior: "smooth" })}
                className="px-4 py-3 rounded-full border border-border text-text text-sm hover:bg-card"
              >
                Meet the Team
              </button>
            </motion.div>

            <div className="mt-8 flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-text">{hackathonsHosted}+</div>
                <div className="text-xs text-muted">Hackathons Hosted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-text">{projectsSubmitted}+</div>
                <div className="text-xs text-muted">Projects Submitted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-text">{developersOnboard}+</div>
                <div className="text-xs text-muted">Developers Onboard</div>
              </div>
            </div>
          </div>

          {/* Right: Styled Info Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-card border border-border backdrop-blur-md rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-tr from-primary to-primary-2 flex items-center justify-center text-4xl">
                🏆
              </div>
              <div>
                <div className="text-sm text-text font-semibold">Seamless Experience</div>
                <div className="text-xs text-muted">Designed for developers, by developers.</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-3 bg-bg-elev rounded-lg">
                <div className="text-xs text-muted">Easy Teaming</div>
                <div className="font-semibold mt-1 text-text">Find & Form Teams in Clicks</div>
              </div>
              <div className="p-3 bg-bg-elev rounded-lg">
                <div className="text-xs text-muted">Transparent Judging</div>
                <div className="font-semibold mt-1 text-text">Clear Criteria & Feedback</div>
              </div>
            </div>

            <div className="mt-6 text-sm text-muted">
              Tech: React, Tailwind, Framer Motion • Backend: Node, Mongo • Integrations: GitHub, Figma
            </div>
          </motion.div>
        </div>
      </header>

      {/* STORY STRIP */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.5 }}
            className="rounded-xl p-8 bg-card border border-border"
          >
            <h3 className="text-2xl font-bold text-text">Problem → Opportunity → Our Solution</h3>
            <div className="mt-6 grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-bg-elev rounded-lg">
                <div className="font-semibold text-lg text-text">The Problem</div>
                <p className="mt-2 text-sm text-muted">
                  Existing hackathon platforms are often cluttered, with complex registration and difficult team formation.
                </p>
              </div>
              <div className="p-4 bg-bg-elev rounded-lg">
                <div className="font-semibold text-lg text-text">The Opportunity</div>
                <p className="mt-2 text-sm text-muted">
                   A need for a clean, minimalist, and hyper-personalized platform that focuses on user experience.
                </p>
              </div>
              <div className="p-4 bg-bg-elev rounded-lg">
                <div className="font-semibold text-lg text-text">Innovortex Solution</div>
                <p className="mt-2 text-sm text-muted">
                  An ultra-smooth UI, seamless teaming, integrated collaboration tools, and a transparent judging process.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision Cards */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { title: "Vision", text: "To be the most developer-friendly platform for innovation." },
            { title: "Mission", text: "Simplify hackathon management and foster global collaboration." },
            { title: "Goal", text: "Empower a global community of builders and creators." },
          ].map((c, i) => (
            <motion.div
              whileHover={{ scale: 1.03, y: -6 }}
              key={i}
              className="bg-card border border-border rounded-2xl p-6 shadow-lg"
            >
              <div className="text-sm text-text font-semibold">{c.title}</div>
              <div className="mt-3 font-bold text-lg text-text">{c.text}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team timeline */}
      <section id="team" className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-2">
            Meet the Architects of Innovortex
          </h2>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-transparent opacity-60" />
            <div className="space-y-8">
              {TEAM.map((m, i) => (
                <div key={m.name} className={`flex w-full ${m.side === 'left' ? 'md:justify-start' : 'md:justify-end'}`}>
                  <div className="md:w-1/2 px-3 md:px-0">
                    <TeamItem member={m} index={i} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <footer className="py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.5 }}
            className="p-8 rounded-3xl bg-card border border-border"
          >
            <h3 className="text-2xl md:text-4xl font-extrabold text-text">Ready to build the future?</h3>
            <p className="mt-3 text-muted max-w-2xl mx-auto">
              Join Innovortex — host a world-class hackathon, find your dream team, or showcase your projects to the world.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={() => {
                  burstConfetti();
                  navigate('/signup');
                }}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-primary to-primary-2 text-white shadow-lg font-semibold transform hover:scale-105"
              >
                Get Started — It's Free
              </button>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="px-5 py-3 rounded-full border border-border text-sm text-text"
              >
                Back to Top
              </button>
            </div>
          </motion.div>
          <div className="mt-8 text-xs text-muted/60">
            © {new Date().getFullYear()} Innovortex 4.0 — Built by Shubham & Team with ❤️
          </div>
        </div>
      </footer>
    </div>
  );
}