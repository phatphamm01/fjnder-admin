const colorsTw = require('tailwindcss/colors');

const colors = {
  ...colorsTw,
  // primary
  'primary-50': '#FFEDEF',
  'primary-100': '#FFDADE',
  'primary-200': '#FFB4BC',
  'primary-300': '#FF8F9B',
  'primary-400': '#FF6979',
  'primary-500': '#FF4458',
  'primary-600': '#BF3342',
  'primary-700': '#80222C',
  'primary-800': '#401116',
  'primary-900': '#1A0709',

  // secondary
  'secondary-50': '#F4ECFC',
  'secondary-100': '#E8D9F7',
  'secondary-200': '#D1B2EF',
  'secondary-300': '#BA8CE7',
  'secondary-400': '#A365DF',
  'secondary-500': '#8C3FD7',
  'secondary-600': '#692FA1',
  'secondary-700': '#46206C',
  'secondary-800': '#231036',
  'secondary-900': '#0E0616',

  // neutral
  'neutral-50': '#F9F9F9',
  'neutral-100': '#F2F2F2',
  'neutral-200': '#E4E4E4',
  'neutral-300': '#D7D7D7',
  'neutral-400': '#C9C9C9',
  'neutral-500': '#BCBCBC',
  'neutral-600': '#8D8D8D',
  'neutral-700': '#5E5E5E',
  'neutral-800': '#2F2F2F',
  'neutral-900': '#131313',

  current: 'currentColor',
  transparent: 'transparent',
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors,
    extend: {},
  },
  plugins: ['@tailwindcss/forms', require('prettier-plugin-tailwindcss')],
};
