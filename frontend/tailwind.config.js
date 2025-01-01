/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#007BFF",
        "secondary-blue": "#4A90E2",
        "tertiary-blue": "#5DADE2",

        "primary-green": "#28A745",
        "secondary-green": "#2ECC71",

        "light-gray": "#E9ECEF",
        "medium-gray": "#D5DBE1",
        "dark-gray": "#717171",

        "primary-red": "#DC3545",
        "secondary-red": "#FF6F61",

        "primary-yellow": "#FFC107",

        "primary-purple": "#6F42C1",

        "teal-green": "#20C997",
      },
      animation: {
        pulse: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
    fontFamily: {
      acme: ["Acme", "sans-serif"],
      roboto: ["Roboto", "sans-serif"],
    },
  },
  plugins: [],
};
