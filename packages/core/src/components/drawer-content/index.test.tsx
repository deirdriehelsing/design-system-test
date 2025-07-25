import { render, screen } from '@testing-library/react';
import DrawerContent from '.';
import React from 'react';

describe('DrawerContent', () => {
  it('renders its children', () => {
    render(<DrawerContent>Content</DrawerContent>);

    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
