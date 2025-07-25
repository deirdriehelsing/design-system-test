import type { FabCorner } from '../../types';

import { render, screen } from '@testing-library/react';
import Fab from '.';
import React from 'react';

describe('<Fab />', () => {
  it('renders', () => {
    render(
      <Fab>
        <span>mock</span>
      </Fab>
    );
  });

  it.each(['top', 'right', 'bottom', 'left'] as FabCorner[])('adds corner styles', (corner) => {
    render(
      <Fab corner={corner}>
        <span>mock</span>
      </Fab>
    );

    expect(screen.getByRole('button')).toHaveClass(`MuiFab-Corner-${corner}`);
  });

  it('accepts other classes', () => {
    render(
      <Fab classes={{ root: 'Mock-Root', circular: 'Mock-Circular' }} corner="right">
        <span>mock</span>
      </Fab>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('Mock-Root');
    expect(button).toHaveClass('Mock-Circular');
    expect(button).toHaveClass('MuiFab-Corner-right');
  });
});
