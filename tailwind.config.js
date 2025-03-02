module.exports = {
    theme: {
      extend: {
        keyframes: {
          spring: {
            "0%, 100%": { transform: "scale(1)" },
            "50%": { transform: "scale(1.2)" },
          },
        },
        animation: {
          spring: "spring 0.5s ease-in-out",
        },
      },
    },
    plugins: [],
  };