/* Particles Component
   Global animated particle background for the entire website
   Dependencies: react
*/

import React, { useEffect, useRef } from 'react';

const Particles = () => {
  const ref = useRef();
  
  useEffect(() => {
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
  
  return (
    <canvas 
      ref={ref} 
      className="pointer-events-none fixed inset-0 -z-10" 
      aria-hidden="true"
    />
  );
};

export default Particles;
