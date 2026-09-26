/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070C1B',
          900: '#0B132B',
          800: '#1C2541',
          700: '#2A365B',
          600: '#3A506B',
        },
        cyan: {
          400: '#00F5D4',
          500: '#4CC9F0',
          600: '#48CAE4',
        },
        risk: {
          low: '#10B981',
          moderate: '#F59E0B',
          severe: '#EF4444',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      }
    },
  },
  plugins: [],
}
