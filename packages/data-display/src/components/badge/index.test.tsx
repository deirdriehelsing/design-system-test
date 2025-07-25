import Badge from '.';
import React from 'react';
import { render } from '@testing-library/react';

describe('<Badge />', () => {
  it('renders', () => {
    render(<Badge />);
  });

  it('styles large badge', () => {
    const { container } = render(<Badge size="large" />);
    expect(container.firstChild).toHaveClass('BlueshiftBadge-sizeLarge');
  });
});
