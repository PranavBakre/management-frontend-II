module.exports = {
  purge: {
    enabled: true,
    content: [
      "./src/**/*.html",
      './src/**/*.ts',
      './src/**/*.css',
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      scale: ["hover"]
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
