import Grow from '.';
import React from 'react';
import { render } from '@testing-library/react';

describe('<Grow />', () => {
  it('renders', () => {
    render(
      <Grow>
        <span>mock</span>
      </Grow>
    );
  });
});
