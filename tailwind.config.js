/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        /* Tema Persona — biru neon & putih elegan */
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        persona: {
          blue: "#3b82f6",
          "blue-light": "#60a5fa",
          "blue-glow": "rgba(59, 130, 246, 0.5)",
          white: "#f8fafc",
          "white-smoke": "rgba(248, 250, 252, 0.9)",
        },
        slate: {
          950: "#000000",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at var(--tw-gradient-cx) var(--tw-gradient-cy), var(--tw-gradient-stops))",
        "persona-mesh":
          "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 25%), radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 30%)",
      },
      boxShadow: {
        "neon-blue": "0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.2)",
        "neon-blue-lg": "0 0 30px rgba(59, 130, 246, 0.4), 0 0 60px rgba(59, 130, 246, 0.3)",
        "neon-inner": "inset 0 0 15px rgba(59, 130, 246, 0.3)",
      },
      animation: {
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
