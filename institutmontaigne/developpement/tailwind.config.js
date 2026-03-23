/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0B1D3A',
        ink: '#1a1a1a',
        offwhite: '#F6F5F1',
        'accent-blue': '#2563EB',
        'accent-red': '#C41E3A',
        'montaigne-burgundy': '#872339',
        'montaigne-contrast': '#FFFFFF',
        'vert-sapin': '#004832',
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'slide-down': 'slideDown 400ms ease-out',
        'fade-in': 'fadeIn 600ms ease-out both',
      },
      keyframes: {
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

