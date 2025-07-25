import { create } from '@storybook/theming';

const theme = create({
  base: 'light',

  fontBase: '"Poppins", sans-serif',
  fontCode: 'monospace',

  colorPrimary: '#1c192b',
  colorSecondary: '#4a48c6',

  brandTitle: 'BlueshiftUI',
  brandUrl: '/',
  brandImage: '',
  brandTarget: '_self',

  // UI
  appBg: '#f9f8f7',
  appContentBg: '#fff',
  appBorderColor: '#efeeea',
  appBorderRadius: 4,

  // Text colors
  textColor: '#0d0c3c',
  textInverseColor: '#efeeea',

  // Toolbar default and active colors
  barTextColor: '#5a536c',
  barSelectedColor: '#1c192b',
  barBg: '#efeeea',

  // Form colors
  inputBg: '#fff',
  inputBorder: '#8d899b',
  inputTextColor: 'black',
  inputBorderRadius: 4,
});

export default theme;