import React from 'react';
import RoundButton from '.';
import { render } from '@testing-library/react';

jest.mock('./index.css', () => ({
  buttonBase: 'mock-round-button-base-styles',
  buttonSize: {
    large: 'mock-round-button-large-size-styles',
    medium: 'mock-round-button-medium-size-styles',
    small: 'mock-round-button-small-size-styles',
  },
  buttonVariant: {
    contained: 'mock-round-button-contained-variant-styles',
    outlined: 'mock-round-button-outlined-variant-styles',
    text: 'mock-round-button-text-variant-styles',
  },
  wrapper: 'mock-round-button-wrapper-styles',
}));

describe('<RoundButton />', () => {
  it('renders', () => {
    const { container } = render(<RoundButton />);

    // Wrapper
    expect(container.firstChild).toHaveClass('mock-round-button-wrapper-styles');

    // Button
    expect(container.firstChild?.firstChild).toHaveClass('mock-round-button-base-styles');
  });

  it.each(['large', 'medium', 'small'] as const)('renders with a size of %s', (size) => {
    const { container } = render(<RoundButton size={size} />);

    expect(container.firstChild?.firstChild).toHaveClass(`mock-round-button-${size}-size-styles`);
  });

  it.each(['contained', 'outlined', 'text'] as const)('renders with a variant of %s', (variant) => {
    const { container } = render(<RoundButton variant={variant} />);

    expect(container.firstChild?.firstChild).toHaveClass(
      `mock-round-button-${variant}-variant-styles`
    );
  });
});
