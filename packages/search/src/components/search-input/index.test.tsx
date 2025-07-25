import type { SearchInputProps } from './index';

import { render, screen, within } from '@testing-library/react';
import React from 'react';
import Search from './index';

const defaultProps: SearchInputProps = {
  isLoading: false,
  result: [],
  placeholder: 'Search',
  value: 'math',
};

jest.mock('@mui/material/Skeleton', () => jest.fn(() => <samp>Skeleton</samp>));

describe('<Search />', () => {
  describe('renders', () => {
    it('successfully', () => {
      render(<Search {...defaultProps} />);

      expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    });

    describe('when loading', () => {
      it('shows loading skeleton', () => {
        render(<Search {...defaultProps} isLoading={true} />);

        const searchResultsRegion = screen.getByRole('region');

        expect(within(searchResultsRegion).getAllByText('Skeleton')).toHaveLength(6);
      });
    });

    describe('when with results', () => {
      it('shows results', () => {
        const result = [<div key={1}>Result 1</div>, <div key={2}>Result 2</div>];

        render(<Search {...defaultProps} result={result} />);

        const searchResultsRegion = screen.getByRole('region');

        expect(within(searchResultsRegion).getByText('Result 1')).toBeInTheDocument();
        expect(within(searchResultsRegion).getByText('Result 2')).toBeInTheDocument();
      });
    });
  });

  describe('interaction', () => {
    it('should start with initial value', () => {
      render(<Search {...defaultProps} />);
      const inputElement = screen.getByPlaceholderText('Search');

      expect(inputElement).toHaveValue(defaultProps.value);
    });

    describe('clear button', () => {
      it('should render clear button if there is text', () => {
        render(<Search {...defaultProps} />);
        expect(screen.getByRole('button')).toBeInTheDocument();
      });

      it('should not render clear button if there is no text', () => {
        render(<Search {...defaultProps} value="" />);

        expect(screen.queryByRole('button')).not.toBeInTheDocument();
      });
    });
  });
});
