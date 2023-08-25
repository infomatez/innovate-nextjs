module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      keyframes: {
        navbarExtend: {
          '0%': { width: '90%', borderBottom: 'green 1px solid' },
          '100%': { width: '100%', borderBottom: 'purple 1px solid' },
        },
        mulShdSpin: {
          '0%, 100%': {
            'box-shadow':
              '0em -2.6em 0em 0em #ffffff, 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.5), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7)',
          },
          '12.5%': {
            'box-shadow':
              '0em -2.6em 0em 0em rgba(255, 255, 255, 0.7), 1.8em -1.8em 0 0em #ffffff, 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5)',
          },
          '25%': {
            'box-shadow':
              '0em -2.6em 0em 0em rgba(255, 255, 255, 0.5), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7), 2.5em 0em 0 0em #ffffff, 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2)',
          },
          '37.5%': {
            'box-shadow':
              '0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5), 2.5em 0em 0 0em rgba(255, 255, 255, 0.7), 1.75em 1.75em 0 0em #ffffff, 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2)',
          },
          '50%': {
            'box-shadow':
              '0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.5), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.7), 0em 2.5em 0 0em #ffffff, -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2)',
          },
          '62.5%': {
            'box-shadow':
              '0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.5), 0em 2.5em 0 0em rgba(255, 255, 255, 0.7), -1.8em 1.8em 0 0em #ffffff, -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2)',
          },
          '75%': {
            'box-shadow':
              '0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.5), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.7), -2.6em 0em 0 0em #ffffff, -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2)',
          },
          '87.5%': {
            'box-shadow':
              '0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.5), -2.6em 0em 0 0em rgba(255, 255, 255, 0.7), -1.8em -1.8em 0 0em #ffffff',
          },
        },
        thinking: {
          '0%': { color: 'white' },
          '100%': { color: 'rgb(40, 96, 142)' },
        },
        glowBulb: {
          // Define your keyframes for bulb glow animation here
          from: {
            boxShadow: '0 0 15px #ffee10',
          },
          to: {
            boxShadow: '0 0 5px #ffee10',
          },
        },
        writing: {
          '0%': {
            boxShadow: '0 0 5px #ffee10',
            transform: 'scale(1)',
          },
          '25%': {
            boxShadow: '0 0 5px purple',
            transform: 'scale(0.95)',
          },

          '50%': {
            boxShadow: '0 0 5px #ffee10',
            transform: 'scale(1)',
          },

          '75%': {
            boxShadow: '0 0 5px purple',
            transform: 'scale(0.95)',
          },

          '100%': {
            boxShadow: '0 0 5px #ffee10',
            transform: 'scale(1)',
          },
        },
        pencilBody1: {
          from: {
            'stroke-dashoffset': '351.86',
            transform: 'rotate(-90deg)',
          },
          to: {
            'stroke-dashoffset': '351.86',
            transform: 'rotate(-90deg)',
          },
          '50%': {
            'stroke-dashoffset': '150.8',
            transform: 'rotate(-225deg)',
          },
        },
        pencilBody2: {
          from: {
            'stroke-dashoffset': '406.84',
            transform: 'rotate(-90deg)',
          },
          to: {
            'stroke-dashoffset': '406.84',
            transform: 'rotate(-90deg)',
          },
          '50%': {
            'stroke-dashoffset': '174.36',
            transform: 'rotate(-225deg)',
          },
        },
        pencilBody3: {
          from: {
            'stroke-dashoffset': '296.88',
            transform: 'rotate(-90deg)',
          },
          to: {
            'stroke-dashoffset': '296.88',
            transform: 'rotate(-90deg)',
          },
          '50%': {
            'stroke-dashoffset': '127.23',
            transform: 'rotate(-225deg)',
          },
        },
        pencilEraser: {
          from: {
            transform: 'rotate(-45deg) translate(49px, 0)',
          },
          to: {
            transform: 'rotate(-45deg) translate(49px, 0)',
          },
          '50%': {
            transform: 'rotate(0deg) translate(49px, 0)',
          },
        },
        pencilEraserSkew: {
          from: {
            transform: 'skewX(0)',
          },
          '32.5%': {
            transform: 'skewX(0)',
          },
          '67.5%': {
            transform: 'skewX(0)',
          },
          to: {
            transform: 'skewX(0)',
          },
          '35%': {
            transform: 'skewX(-4deg)',
          },
          '65%': {
            transform: 'skewX(-4deg)',
          },
          '37.5%': {
            transform: 'skewX(8deg)',
          },
          '62.5%': {
            transform: 'skewX(8deg)',
          },
          '40%': {
            transform: 'skewX(-15deg)',
          },
          '45%': {
            transform: 'skewX(-15deg)',
          },
          '50%': {
            transform: 'skewX(-15deg)',
          },
          '55%': {
            transform: 'skewX(-15deg)',
          },
          '60%': {
            transform: 'skewX(-15deg)',
          },
          '42.5%': {
            transform: 'skewX(15deg)',
          },
          '47.5%': {
            transform: 'skewX(15deg)',
          },
          '52.5%': {
            transform: 'skewX(15deg)',
          },
          '57.5%': {
            transform: 'skewX(15deg)',
          },
        },
        pencilPoint: {
          from: {
            transform: 'rotate(-90deg) translate(49px, -30px)',
          },
          to: {
            transform: 'rotate(-90deg) translate(49px, -30px)',
          },
          '50%': {
            transform: 'rotate(-225deg) translate(49px, -30px)',
          },
        },
        pencilRotate: {
          from: {
            transform: 'translate(100px, 100px) rotate(0)',
          },
          to: {
            transform: 'translate(100px, 100px) rotate(720deg)',
          },
        },
        pencilStroke: {
          from: {
            'stroke-dashoffset': '439.82',
            transform: 'translate(100px, 100px) rotate(-113deg)',
          },
          '50%': {
            'stroke-dashoffset': '164.93',
            transform: 'translate(100px, 100px) rotate(-113deg)',
          },
          '75%': {
            'stroke-dashoffset': '439.82',
            transform: 'translate(100px, 100px) rotate(112deg)',
          },
          to: {
            'stroke-dashoffset': '439.82',
            transform: 'translate(100px, 100px) rotate(112deg)',
          },
        },
      },

      borderWidth: {
        3: '3px',
      },
      boxShadow: {
        card: '0px 35px 120px -15px #211e35',
        'login-input': '3.325141668319702px 2.493856191635132px 0.41564270853996277px 0px rgba(255, 255, 255, 0.13)',
      },
      animation: {
        nav: 'navbarExtend 0.25s',
        navReverse: 'navbarExtend 0.25s reverse',
        thinking: 'thinking 3s reverse infinite',
        glowBulb: 'glowBulb 2s linear infinite',
        writing: 'writing 5s linear infinite',
        pencilBody1: 'pencilBody1 3s linear infinite',
        pencilBody2: 'pencilBody2  3s linear infinite',
        pencilBody3: 'pencilBody3  3s linear infinite',
        pencilEraser: 'pencilEraser  3s linear infinite',
        pencilEraserSkew: 'pencilEraserSkew 3s linear infinite',
        pencilPoint: 'pencilPoint 3s linear infinite',
        pencilRotate: 'pencilRotate 3s linear infinite',
        pencilStroke: 'pencilStroke 3s linear infinite',
        mulShdSpin: 'mulShdSpin 1.1s infinite ease',
        bounce: 'bounce 1s infinite',
      },
      colors: {
        black: {
          0: '#000',
          100: '#393939',
          300: '#181818',
          400: '#1c1c1c',
          500: '#1e1e1ef2',
          600: '#100f0f',
          700: '#00041c',
          800: '#100d25',
        },
        grey: {
          100: '#fefefe',
          200: '#5a5a5a',
          300: '#BEBEBE',
        },
        white: '#fff',
        pink: {
          100: '#ff00f2',
          200:'#BD30FF'
        },
        purple: {
          800: '#ab01fa',
        },
        tertiary: '#151030',
        secondary: '#aaa6c3',
      },
      spacing: {
        0.8: '0.8rem',
        0.5: '0.5rem',
      },
      borderRadius: {
        sm: '2px',
        md: '4px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
        '3xl': '24px',
        full: '9999px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'sidebar': 'linear-gradient(180deg, rgba(56, 59, 68, 0.50) 0%, rgba(22, 23, 27, 0.00) 80.53%);',
        'moving-star': "url('/stars.mp4')",
        'star': "url('/ourblogsbackground.jpg')"
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        bookman: ['Bookman Old Style', 'sans-serif'],
        alkatra: ['Alkatra', 'cursive'],
        montserrat: ['Montserrat', 'sans-serif'],
        'fjalla-one': ['Fjalla One', 'sans-serif'],
        'times-new-roman': ['Times New Roman', 'Times', 'serif'],
        quicksand: ['Quicksand', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
        'm-plus': ['M PLUS 1', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
