import Divider from '.';
import React from 'react';
import { render } from '@testing-library/react';

describe('<Divider />', () => {
  it('renders', () => {
    render(
      <>
        <h1>Upper Content</h1>
        <Divider />
        <h2>Lower Content</h2>
      </>
    );
  });
});
