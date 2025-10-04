/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg': 'var(--bg)',
        'bg-elev': 'var(--bg-elev)',
        'text': 'var(--text)',
        'muted': 'var(--muted)',
        'primary': 'var(--primary)',
        'primary-2': 'var(--primary-2)',
        'accent': 'var(--accent)',
        'card': 'var(--card)',
        'border': 'var(--border)',
        'nav': 'var(--nav)',
        'card-start': 'var(--card-start)', // Custom gradient start color
        'card-end': 'var(--card-end)',     // Custom gradient end color
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        display: 'var(--font-display)',
      },
      borderRadius: {
        'xl': 'var(--radius)',
      },
      boxShadow: {
        'lg': 'var(--shadow)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'streak-fill': {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'streak-fill': 'streak-fill 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
}

