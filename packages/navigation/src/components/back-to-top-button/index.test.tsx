import { render, screen } from '@testing-library/react';
import { scrollToElement, scrollToTop } from '../../helpers';
import BackToTopButton from '.';
import React from 'react';
import userEvent from '@testing-library/user-event';

jest.mock('../../helpers', () => ({
  scrollToTop: jest.fn(),
  scrollToElement: jest.fn(),
}));

const mockOnClick = jest.fn();

describe('<BackToTopButton />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders', () => {
    render(<BackToTopButton />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  describe('interaction', () => {
    describe('when button is clicked', () => {
      describe('when targetSelector prop is provided', () => {
        it('scrolls to target element using selector', async () => {
          const user = userEvent.setup();

          render(<BackToTopButton targetSelector="#top" />);
          const button = screen.getByRole('button');

          await user.click(button);

          expect(scrollToElement).toHaveBeenCalledWith({ selector: '#top' });
        });
      });

      describe('when targetElement prop is provided', () => {
        it('scrolls to target element using element reference', async () => {
          const user = userEvent.setup();

          const targetElement = document.createElement('div');
          render(<BackToTopButton targetElement={targetElement} />);

          const button = screen.getByRole('button');

          await user.click(button);

          expect(scrollToElement).toHaveBeenCalledWith({ element: targetElement });
        });
      });

      describe('when no target prop is provided', () => {
        it('scrolls to top of page', async () => {
          const user = userEvent.setup();

          render(<BackToTopButton />);
          const button = screen.getByRole('button');

          await user.click(button);

          expect(scrollToTop).toHaveBeenCalled();
        });
      });

      describe('when onClick prop is provided', () => {
        it('calls onClick prop', async () => {
          const user = userEvent.setup();

          render(<BackToTopButton onClick={mockOnClick} />);
          const button = screen.getByRole('button');

          await user.click(button);

          expect(mockOnClick).toHaveBeenCalled();
        });
      });
    });
  });
});
