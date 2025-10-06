import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, X, Calendar, Users } from "lucide-react";

const winners = [
  {
    id: 1,
    title: "EcoTracker Pro",
    category: "AI/ML",
    year: 2024,
    description:
      "AI-powered carbon footprint tracker using computer vision and gamified sustainability insights.",
    image:
      "public/images/W1.jpeg",
    team: ["Shivansh Chaturvedi", "Rohan Kumar", "Ananya Prasad"],
    tech: ["React Native", "Python", "TensorFlow"],
    position: "Winner",
  },
  {
    id: 2,
    title: "HealthConnect AI",
    category: "Healthcare",
    year: 2024,
    description:
      "Telemedicine with AI diagnosis and rural-to-urban doctor connectivity using deep learning.",
    image:
      "public/images/w2.jpeg",
    team: ["Sneha Jha", "Aryan Verma", "Muskan Kumari"],
    tech: ["Vue.js", "Node.js", "OpenAI"],
    position: "Winner",
  },
  {
    id: 3,
    title: "CryptoSecure Vault",
    category: "Blockchain",
    year: 2024,
    description:
      "Next-gen decentralized identity vault ensuring privacy and ownership with Web3.0.",
    image:
      "public/images/w3.jpg",
    team: ["Aryan Rajput", "Kriti Kothari"],
    tech: ["React", "Solidity", "Web3.js"],
    position: "1st Runner-up",
  },
  {
    id: 4,
    title: "EduQuest AR",
    category: "EdTech",
    year: 2024,
    description:
      "Gamified AR learning experience bringing immersive lessons to life in classrooms.",
    image:
      "public/images/w4.jpg",
    team: ["Nikhil Mallya", "Gaurav Singh"],
    tech: ["Unity", "ARCore", "Firebase"],
    position: "Winner",
  },
  {
    id: 5,
    title: "AgroSmartSense",
    category: "IoT / AI",
    year: 2024,
    description:
      "Precision agriculture system combining IoT sensors with AI yield prediction.",
    image:
      "public/images/w5.jpg",
    team: ["Akash Dubey", "Pooja Jain"],
    tech: ["Arduino", "Python", "TensorFlow"],
    position: "2nd Runner-up",
  },
  {
    id: 6,
    title: "CityFlow AI",
    category: "Smart Mobility",
    year: 2024,
    description:
      "AI-driven traffic optimization system for real-time congestion management.",
    image:
      "public/images/w6.jpg",
    team: ["Sourav Mukherjee", "Vaishnavi Singh"],
    tech: ["Next.js", "Flask", "Google Maps API"],
    position: "Winner",
  },
  {
    id: 7,
    title: "WasteZero",
    category: "Sustainability",
    year: 2024,
    description:
      "Smart waste segregation with AI image recognition and gamified citizen rewards.",
    image:
      "public/images/W1.jpeg",
    team: ["Ravi Teja", "Lakshmi Priya"],
    tech: ["React", "FastAPI", "OpenCV"],
    position: "Winner",
  },
];

export default function WinnersGallery() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen text-text px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12 mt-16"
      >
        <h1 className="text-5xl font-extrabold mb-4 flex justify-center items-center gap-3">
          <Trophy className="text-yellow-400 w-10 h-10" /> Hall of Fame
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-muted leading-relaxed">
          Celebrating innovation, creativity, and relentless pursuit of excellence.
          Explore the most remarkable minds who redefined possibilities.
        </p>
      </motion.div>

      {/* Cards */}
      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
        }}
      >
        {winners.map((winner) => (
          <motion.div
            key={winner.id}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="bg-card rounded-2xl shadow-lg overflow-hidden border border-border cursor-pointer hover:shadow-xl hover:shadow-primary-2/20 transition"
            onClick={() => setSelected(winner)}
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={winner.image}
                alt={winner.title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-primary-2 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {winner.position}
              </div>
              <div className="absolute bottom-3 left-3 bg-bg-elev text-xs px-3 py-1 rounded-full opacity-80">
                {winner.category}
              </div>
            </div>

            <div className="p-5">
              <h2 className="text-xl font-bold mb-1 text-primary">
                {winner.title}
              </h2>
              <p className="text-muted text-sm mb-3">{winner.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {winner.tech.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs bg-bg-elev px-3 py-1 rounded-full border border-border"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-muted">
                <div className="flex -space-x-2">
                  {winner.team.map((member, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full bg-gradient-to-tr from-primary-2 to-accent text-white flex items-center justify-center border border-border text-[10px] font-bold"
                    >
                      {member.split(" ").map(n => n[0]).join("")}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={14} /> {winner.year}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-card rounded-3xl max-w-2xl w-full p-6 relative text-left shadow-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-muted hover:text-primary transition"
              >
                <X size={22} />
              </button>
              <img
                src={selected.image}
                alt={selected.title}
                className="w-full h-64 object-cover rounded-xl mb-5"
              />
              <h2 className="text-2xl font-extrabold mb-2 text-primary">
                {selected.title}
              </h2>
              <p className="text-sm text-muted mb-4">{selected.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <strong className="text-text">Category:</strong>{" "}
                  <span className="text-muted">{selected.category}</span>
                </div>
                <div>
                  <strong className="text-text">Year:</strong>{" "}
                  <span className="text-muted">{selected.year}</span>
                </div>
                <div>
                  <strong className="text-text">Position:</strong>{" "}
                  <span className="text-primary-2 font-semibold">{selected.position}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {selected.tech.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs bg-bg-elev px-3 py-1 rounded-full border border-border"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="text-sm mb-4">
                <strong className="text-text block mb-2">Team Leader:</strong>
                <span className="text-muted">{selected.leader}</span>
              </div>
              <div className="text-sm mb-4">
                <strong className="text-text block mb-2">Team Members:</strong>
                <div className="flex flex-wrap gap-2">
                  {selected.team.map((m, i) => (
                    <span key={i} className="flex items-center gap-1 bg-bg-elev px-3 py-1 rounded-full text-muted border border-border">
                      <Users size={14} className="text-primary-2" /> {m}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}