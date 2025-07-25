import { render, screen } from '@testing-library/react';
import DrawerFooter from '.';
import React from 'react';

describe('DrawerFooter', () => {
  it('renders its children', () => {
    render(<DrawerFooter>Content</DrawerFooter>);

    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
