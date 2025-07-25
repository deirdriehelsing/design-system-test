import React from 'react';
import ThemeProvider from '.';
import { render } from '@testing-library/react';

describe('<ThemeProvider />', () => {
  it('renders', () => {
    render(<ThemeProvider />);
  });
});
