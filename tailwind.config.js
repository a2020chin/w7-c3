module.exports = {
  content: ["./app/**/*.{html,ejs}"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1184px',
    },
    container: {
      center: true, 
      padding: "16px"
    },
    fontFamily: {
      'noto-sans': ['Noto Sans TC', 'sans-serif'],
      'roboto': ['Roboto', 'sans-serif']
    },
    
    extend: {
      colors: {
        primary: '#00807E',
        secondary: '#64C3BF',
        oslo: '#818A91'
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}