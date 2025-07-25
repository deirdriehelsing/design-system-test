import Fade from '.';
import React from 'react';
import { render } from '@testing-library/react';

describe('<Fade />', () => {
  it('renders', () => {
    render(
      <Fade>
        <span>mock</span>
      </Fade>
    );
  });
});
