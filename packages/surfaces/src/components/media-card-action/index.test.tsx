import MediaCardAction from '.';
import React from 'react';
import { render } from '@testing-library/react';

describe('<MediaCardAction />', () => {
  it('renders MediaCardAction', () => {
    render(
      <MediaCardAction color="primary" href="https://en.wikipedia.org/wiki/Tutoring">
        Mocked Content
      </MediaCardAction>
    );
  });
});
