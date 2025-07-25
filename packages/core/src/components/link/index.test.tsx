import { MemoryRouter, Link as RouterLink } from 'react-router-dom';
import Grow from '../grow';
import Link from '.';
import React from 'react';
import { render } from '@testing-library/react';

describe('<Link />', () => {
  const errorSpy = jest.spyOn(console, 'error');

  it('renders', () => {
    render(<Link />);
  });

  it('renders successfully inside component that requires ref support', () => {
    render(
      <Grow title="test">
        <Link />
      </Grow>
    );

    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('renders successfully with a custom component', () => {
    render(
      <MemoryRouter>
        <Link component={RouterLink} to="https://example.com">
          Test
        </Link>
      </MemoryRouter>
    );

    expect(errorSpy).not.toHaveBeenCalled();
  });
});
