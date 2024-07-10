/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        navbarBg: '#1F2937', // bg-gray-800
        navbarText: '#E5E7EB', // text-gray-200
        menuBg: '#374151', // bg-gray-700
        menuHoverBg: '#4B5563', // hover:bg-gray-600
        borderGray: '#4B5563', // border-gray-600
        buttonPrimary: '#7C3AED', // bg-purple-600
        buttonPrimaryHover: '#6D28D9', // hover:bg-purple-700
        buttonSecondary: '#A78BFA', // bg-purple-400
        buttonSecondaryHover: '#8B5CF6', // hover:bg-purple-500
        
      },
    },
  },
  plugins: [],
}
