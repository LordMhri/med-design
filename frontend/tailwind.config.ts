import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Updated to match the exact colors from image_2026-06-21_21-14-38.png
        ink: {
          DEFAULT: '#072533', // Rich Black
          deep: '#051b26',
          900: '#072533',
          950: '#031118',
        },
        navy: {
          DEFAULT: '#114257', // Yale Blue
          light: '#16536e',
        },
        accent: {
          DEFAULT: '#5EC1A1', // Medium Aquamarine
          hover: '#73D4B4',
          soft: '#EBF8F4',
        },
        slate: {
          body: '#5B6B78', // body copy on light
          muted: '#8A98A4',
        },
      },
      fontFamily: {
        display: ['NeulisAlt', 'Sora', 'system-ui', 'sans-serif'],
        sans: ['NeulisAlt', 'Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1200px',
      },
      aspectRatio: {
        'hero-frame': '2141 / 1323',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        card: '0 4px 24px -8px rgba(23, 35, 45, 0.10)',
        'card-hover': '0 18px 40px -12px rgba(23, 35, 45, 0.20)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
