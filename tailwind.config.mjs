/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "keen-slider",
    "md:keen-slider",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '20px',
        sm: '20px',
        lg: '60px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Messina Sans', 'sans-serif'],
      },
      fontSize: {
        'display-d1': ['44px', '54px'],
        'heading-h1': ['36px', '46px'],
        'heading-h2': ['32px', '42px'],
        'heading-h3': ['28px', '38px'],
        'heading-h4-mobile': ['24px', '34px'],
        'subheading-s1': ['20px', '30px'],
        'subheading-s2': ['18px', '28px'],
        'paragraph-p1': ['15px', '23px'],
        'paragraph-p2-mobile': ['14px', '22px'],
        'paragraph-p3': ['13px', '21px'],
        'caption-c1': ['11px', '19px'],
      },
      screens: {
        'md': '900px',
        'lg': '1441px',
        'max-md': { max: '899px' },
        'h-max-md': { raw: '(max-height: 768px)' },
      },
      colors: {
        primary: '#000000',
        secondary: '#FFFFFF',
        grey: '#3F4245',
        charcoal: '#282A2C',
        'wisp-0': '#E6EBE8',
        'wisp-1': '#EDF0EE',
        'wisp-2': '#D5DBD6',
        'wisp-3': '#C4CCC5',
        'sage-1': '#B7C2B9',
        'sage-2': '#9FA8A0',
        'sage-3': '#737A75',
        'sage-4': '#606963',
        'brick-red-0': '#F29580',
        'brick-red-1': '#DB6C53',
        'brick-red-2': '#C7533A',
        'brick-red-3': '#BA4D34',
        'footer': '#4D4F4D',
      },
      padding: {
        '15': '60px',
      },
    },
  },
  plugins: [
    plugin(function({addVariant}){
      addVariant('children', '&>*')  
    })
  ],
};
