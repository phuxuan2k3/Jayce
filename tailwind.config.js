/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",    
  ],
  theme: {
    extend: {
      boxShadow: {
        'gradient': '0px 4px 15px var(--primary-color), 0px 0px 30px var(--secondary-color)',
      },
    },
  },
  plugins: [
    
  ],
}

