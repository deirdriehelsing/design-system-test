import { render, screen } from '@testing-library/react';
import DropdownButton from '.';
import React from 'react';

describe('<DropdownButton />', () => {
  it('renders a button with a caret down icon', () => {
    render(<DropdownButton />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('CaretDown');
  });

  it('renders a button with a caret up icon when open', () => {
    render(<DropdownButton open={true} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('CaretUp');
  });
});
