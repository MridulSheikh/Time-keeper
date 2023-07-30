/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "cs-black": "#292727",
        "cs-pink": {
          200: "#F8F7F6",
          800: "#AF7F66",
        },
        "cs-gray": "#9A9393",
        "cs-text": "#685B5B",
        "cs-nural": "#f8f8f8",
      },
      fontFamily: {
        oswoald: "'Oswald', sans-serif",
        roboto: "'Roboto', sans-serif",
      },
    },
  },
  plugins: [],
};
