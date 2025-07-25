import { render, screen } from '@testing-library/react';
import CardPitch from '.';
import React from 'react';

describe('<CardPitch />', () => {
  describe('rendering', () => {
    it('renders title', () => {
      render(<CardPitch description="Description" title="Title" />);
      expect(screen.getByText('Title')).toBeInTheDocument();
    });

    it('renders description', () => {
      render(<CardPitch description="Description" title="Title" />);
      expect(screen.getByText('Description')).toBeInTheDocument();
    });
  });
});
