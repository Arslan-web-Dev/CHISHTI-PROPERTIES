/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f8f8',
          100: '#d7ecee',
          200: '#b2d9dc',
          300: '#81bdc2',
          400: '#4e9ba2',
          500: '#2c7b82',
          600: '#1b646b',
          700: '#0F5257', // Primary requested deep green accent
          800: '#0c4146',
          900: '#093337',
          950: '#041d20',
        },
        gold: {
          50: '#fbf9f1',
          100: '#f6f0dd',
          200: '#eedfb9',
          300: '#e3c88e',
          400: '#d7af62',
          500: '#C5A880', // Soft gold highlight
          600: '#D4AF37', // Classic gold
          700: '#a37922',
          800: '#835f20',
          900: '#6c4e1f',
        },
        navy: {
          900: '#0B192C',
          950: '#070F1E',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 82, 87, 0.08)',
        'card': '0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        'luxury': '0 20px 40px -15px rgba(15, 82, 87, 0.15)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.25)',
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      }
    },
  },
  plugins: [],
}
