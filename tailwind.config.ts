import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1184CD',
          dark: '#1E303A',
          accent: '#8958FE',
          secondary: '#73B8E3',
          black: '#020A0A',
          white: '#FFFFFF',
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        glow: '0 24px 60px rgba(17, 132, 205, 0.22)',
        soft: '0 16px 45px rgba(30, 48, 58, 0.10)',
        premium: '0 20px 80px rgba(30, 48, 58, 0.18)',
      },
      backgroundImage: {
        'hero-grid':
          'radial-gradient(circle at top left, rgba(115, 184, 227, 0.16), transparent 38%), radial-gradient(circle at top right, rgba(137, 88, 254, 0.12), transparent 32%), linear-gradient(135deg, rgba(17, 132, 205, 0.08), rgba(137, 88, 254, 0.08))',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.04)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 6s ease-in-out infinite',
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
