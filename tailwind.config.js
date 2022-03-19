module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navred: '#E5261E',
        gray1: '#333333',
        gray3: '#828282',
        gray6: '#f2f2f2',
      },
      fontFamily: {
        Rubik: [`Rubik`],
      },
      gridTemplateColumns: {
        nav: '1fr max-content 1fr',
      },
      transitionTimingFunction: {
        custom1: 'cubic-bezier(.52,.16,.24,1)',
      },
    },
  },
  plugins: [],
}
