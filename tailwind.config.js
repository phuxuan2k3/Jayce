/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",    
  ],
  theme: {
    extend: {
      
      colors: {
        'primary': '#2e808a',
        'secondary': '#c1654d',
      },
      textColor: {
        'gradient': 'transparent',
      },
      backgroundImage: {
        'gradient-text': 'linear-gradient(to right, var(--primary-color), var(--secondary-color))',
      },
      boxShadow: {
        'gradient': '0px 4px 15px var(--primary-color), 0px 0px 30px var(--secondary-color)',
      },
    },
  },
  plugins: [
    
  ],
}

