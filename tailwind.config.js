/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "cs-black": "#292727",
        "cs-pink": {
          200: "#F8F7F6",
        },
      },
      fontFamily: {
        oswoald: "var(--font-oswald)",
        dubai: "var(--font-dubai)",
      },
    },
  },
  plugins: [],
};
