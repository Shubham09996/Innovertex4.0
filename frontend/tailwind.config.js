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
    },
  },
  plugins: [],
}

