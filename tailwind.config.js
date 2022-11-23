const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/**
 *
 * 由于移动端开发需求，方便计算，将默认 16px 变成 10px
 *
 * 但是 tailwind 中的单位间距都是有个 rem 做单位， 16px 变成 10px 基数改变, 需要在原来不变像素上用 10px 基数重写一遍
 *
 * @type {import('tailwindcss').Config['theme']}
 *
 */
const ovrriedWithRoot10PX = {
  maxWidth: {
    xs: '32.0rem',
    sm: '38.4rem',
    md: '44.8rem',
    lg: '51.2rem',
    xl: '57.6rem',
    '2xl': '67.2rem',
    '3xl': '76.8rem',
    '4xl': '89.6rem',
    '5xl': '102.4rem',
    '6xl': '115.2rem',
    '7xl': '128.0rem',
  },

  //
  // 为了兼容之前的写法，在10的倍数上以 16px 作为基准单位计算
  // 默认是以 4的倍数作为基数计算间距，但是由于 html font-size 变为了 10px
  // 现在版本从之前的16px -> 10px 整体缩小，所以，这里需要手动将间距放大，去适应以前的环境
  // TODO： 后期将所有间距调整为基准值， 不使用放大值

  /**
   * 因为之前版本 root size 为默认 16px,  tailwind 默认就以 16px 为基准设置 spacing
   *
   * 而现在版本 root size 为 10px, 为了兼容以前代码, 将所有 spacing 重写
   *
   * @see https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
   *
   * 例如：
   *   以前版本 1 -> 4px -> 0.25rem， 而现在 1 -> 4px -> 0.1rem
   *   以前版本 4 -> 16px -> 1rem 而现在 4 -> 16px -> 1.6rem
   *
   * 注意只是 spaceing 使用这规则，也就是将默认的 px 间距用 10 重新换算一遍，间距并未改变
   */
  spacing: {
    0.5: '0.2rem',
    1: '0.4rem',
    1.5: '0.6rem',
    2: '0.8rem',
    2.5: '1rem',
    3: '1.2rem',
    3.5: '1.4rem',
    4: '1.6rem',
    5: '2rem',
    6: '2.4rem',
    7: '2.8rem',
    8: '3.2rem',
    9: '3.6rem',
    10: '4rem',
    11: '4.4rem',
    12: '4.8rem',
    14: '5.6rem',
    16: '6.4rem',
    20: '8rem',
    24: '9.6rem',
    28: '11.2rem',
    32: '12.8rem',
    36: '14.4rem',
    40: '16rem',
    44: '17.6rem',
    48: '19.2rem',
    52: '20.8rem',
    56: '22.4rem',
    60: '24rem',
    64: '25.6rem',
    72: '28.8rem',
    80: '32rem',
    96: '38.4rem',
  },

  /**
   * 字体对应 font-size 和 line-height
   *
   * @see https://tailwindcss.com/docs/font-size
   */
  fontSize: {
    xs: ['1.2rem', '1.6rem'],
    sm: ['1.4rem', '2rem'],
    base: ['1.6rem', '2.4rem'],
    lg: ['1.8rem', '2.8rem'],
    xl: ['2rem', '2.8rem'],
    '2xl': ['2.4rem', '3.2rem'],
    '3xl': ['3rem', '3.6rem'],
    '4xl': ['3.6rem', '4rem'],
    '5xl': ['4.8rem', 1],
    '6xl': ['6rem', 1],
    '7xl': ['7.2rem', 1],
    '8xl': ['9.6rem', 1],
    '9xl': ['12.8rem', 1],
    12: ['1.2rem'],
    14: ['1.4rem'],
    16: ['1.6rem'],
    18: ['1.8rem'],
    20: ['2rem'],
    22: ['2.2rem'],
    24: ['2.4rem'],
    26: ['2.6rem'],
    32: ['3.2rem'],
    34: ['3.4rem'],
    36: ['3.6rem'],
    40: ['4rem'],
    46: ['4.6rem'],
    50: ['5rem'],
    54: ['5.4rem'],
  },
};

// https://redpixelthemes.com/blog/change-tailwindcss-base-font-size/
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      ...ovrriedWithRoot10PX,
      screens: {
        xs: '375px',
        // => @media (min-width: 375px) { ... }
        sm: '640px',
        // => @media (min-width: 640px) { ... }
        md: '768px',
        // => @media (min-width: 768px) { ... }
        lg: '1024px',
        // => @media (min-width: 1024px) { ... }
        xl: '1280px',
        // => @media (min-width: 1280px) { ... }
        '2xl': '1536px',
        // => @media (min-width: 1640px) { ... }
        '3xl': '1640px',

        maxxl: '1920px',
      },
      // 两种字体 LexendDeca 和 Lexend
      fontFamily: {
        lexend: ['Lexend', ...defaultTheme.fontFamily.sans],
        lexendDeca: ['Lexend Deca', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        '1E1C2C': '#1E1C2C',
        FF6A83: '#FF6A83',
      },
    },
  },

  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        html: { fontSize: '10px' },
      });
    }),
  ],
};
