// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     // require('@tailwindcss/line-clamp'),
//   ]
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        moveIllustration: {
          '0%': { transform: 'translateY(0) rotate(0deg) scale(1)' },
          '20%': { transform: 'translateY(-20px) rotate(2deg) scale(1.05)' },
          '40%': { transform: 'translateY(-10px) rotate(-2deg) scale(1.1)' },
          '60%': { transform: 'translateY(10px) rotate(2deg) scale(1.05)' },
          '80%': { transform: 'translateY(20px) rotate(-2deg) scale(0.95)' },
          '100%': { transform: 'translateY(0) rotate(0deg) scale(1)' },
        },
        waves: {
          '0%': { transform: 'scale(0.2)', opacity: '0' },
          '50%': { opacity: '0.9' },
          '100%': { transform: 'scale(0.9)', opacity: '0' },
        },
      },
      animation: {
        moveIllustration: "moveIllustration 5s ease-in-out infinite",
        waves: "waves 1.5s ease-out infinite",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.perspective': {
          perspective: '1000px',
        },
        '.transform-style': {
          transformStyle: 'preserve-3d',
        },
        '.backface-hidden': {
          backfaceVisibility: 'hidden',
        },
        '.rotate-y-180': {
          transform: 'rotateY(180deg)',
        },
        '.hover\\:rotate-y-180:hover': {
          transform: 'rotateY(180deg)',
        },
      })
    },
  ],
}
