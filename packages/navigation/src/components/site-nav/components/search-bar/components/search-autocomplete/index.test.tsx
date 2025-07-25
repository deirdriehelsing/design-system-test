import type { SearchAutocompleteProps } from '../../../../../../types';

import { render, screen } from '@testing-library/react';
import React from 'react';
import SearchAutocomplete from './index';
import userEvent from '@testing-library/user-event';

const defaultProps: SearchAutocompleteProps<string> = {
  clearInput: jest.fn(),
  inputLabel: 'input_aria_label',
  inputValue: 'math',
  isLoading: false,
  options: [],
  placeholder: 'Search',
};

describe('<SearchAutocomplete />', () => {
  describe('renders', () => {
    it('successfully', () => {
      render(<SearchAutocomplete {...defaultProps} />);

      expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    });

    describe('when with results', () => {
      it('shows results', async () => {
        const user = userEvent.setup();

        const propsWithOptions = {
          ...defaultProps,
          options: ['Result 1', 'Result 2'],
        };

        render(<SearchAutocomplete {...propsWithOptions} />);

        const searchInput = screen.getByRole('combobox', { name: 'input_aria_label' });

        await user.type(searchInput, 'r');

        const listbox = await screen.findByRole('listbox');

        expect(listbox).toBeInTheDocument();
        expect(screen.getByText('Result 1')).toBeInTheDocument();
        expect(screen.getByText('Result 2')).toBeInTheDocument();
      });
    });
  });

  describe('interaction', () => {
    it('should start with initial value', () => {
      render(<SearchAutocomplete {...defaultProps} />);
      const inputElement = screen.getByPlaceholderText('Search');

      expect(inputElement).toHaveValue(defaultProps.inputValue);
    });

    describe('clear button', () => {
      it('should render clear button if there is text', () => {
        render(<SearchAutocomplete {...defaultProps} />);

        expect(screen.getByRole('button')).toBeInTheDocument();
      });

      it('should not render clear button if there is no text', () => {
        const propsWithEmptyValue = { ...defaultProps, inputValue: '' };
        render(<SearchAutocomplete {...propsWithEmptyValue} />);

        expect(screen.queryByRole('button')).not.toBeInTheDocument();
      });
    });
  });
});
