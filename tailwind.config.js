/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        axion: {
          dark: '#030508',
          card: '#080C14',
          border: '#151D2A',
          hover: '#1E293B',
          accent: '#38BDF8',
          emerald: '#10B981',
          cyan: '#06B6D4',
          violet: '#8B5CF6',
          rose: '#F43F5E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
