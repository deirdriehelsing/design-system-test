import AppBar from '.';
import React from 'react';
import { render } from '@testing-library/react';

describe('<AppBar />', () => {
  it('renders primary AppBar', () => {
    render(<AppBar />);
  });
});
