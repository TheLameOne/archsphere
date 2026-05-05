/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50:  '#FDFCFA',
          100: '#FAF8F5',
          200: '#F5EFE6',
          300: '#EEE4D4',
        },
        beige: {
          100: '#E8DDD0',
          200: '#D4C4B0',
          300: '#BFA98E',
        },
        brown: {
          100: '#C4956A',
          200: '#A0744A',
          300: '#8B6914',
          400: '#6B4F3A',
          500: '#5C4033',
          600: '#3D2B1F',
        },
        olive: {
          100: '#7A8A6A',
          200: '#5E6E50',
          300: '#4A5240',
          400: '#3D4A32',
          500: '#2E3826',
        },
        dark: {
          100: '#3A3530',
          200: '#2A2420',
          300: '#1C1A17',
          400: '#0F0E0C',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans:  ['DM Sans', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-12px)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

