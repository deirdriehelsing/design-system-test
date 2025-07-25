import { render, screen } from '@testing-library/react';
import Alert from '.';
import React from 'react';

describe('<Alert />', () => {
  it('is defined', () => {
    expect(Alert).toBeDefined();
  });

  describe('when title is passed', () => {
    it('displays the title', () => {
      render(<Alert title="mock-title" />);

      const title = screen.getByText('mock-title');

      expect(title).toBeInTheDocument();
    });
  });
});
