import React from 'react';
import Slide from '.';
import { render } from '@testing-library/react';

describe('<Slide />', () => {
  it('renders', () => {
    render(
      <Slide>
        <span>mock</span>
      </Slide>
    );
  });
});
