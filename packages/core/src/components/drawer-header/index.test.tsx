import { render, screen } from '@testing-library/react';
import DrawerHeader from '.';
import React from 'react';

describe('DrawerHeader', () => {
  it('renders its children', () => {
    render(<DrawerHeader>Content</DrawerHeader>);

    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
