/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans'],
        serif: ['Roboto Slab', 'serif'],
      },
      colors: {
        secondary : { // green  grey from light to dark
          100: '#F0FFF4',
          200: '#C6F6D5',
          300: '#9AE6B4',
          400: '#68D391',
          500: '#48BB78',
          600: '#38A169',
          700: '#2F855A',
          800: '#276749',
          900: '#22543D',
        },
        primary: { // Pastel orange yellow from light to dark
          100: '#FFFAF0',
          200: '#FEEBC8',
          300: '#FBD38D',
          400: '#F6AD55',
          500: '#ED8936',
          600: '#DD6B20',
          700: '#C05621',
          800: '#9C4221',
          900: '#7B341E',
        },
        overlayBg: { // secondary in darker tones 
          default: 'rgba(47, 85, 85, 0.8)',
        },
        feedback : { // red for error, green for success
          error: '#E53E3E',
        }
      }


    },
  },
  plugins: [
    require("@tailwindcss/forms"),     
    require('@tailwindcss/line-clamp'),     
    require('tailwind-scrollbar-hide')
  ],
}