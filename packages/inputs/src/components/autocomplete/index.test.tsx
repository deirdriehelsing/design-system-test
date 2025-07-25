import type { AutocompleteOption } from '../../types/autocomplete-option';

import { render, screen } from '@testing-library/react';
import { ArrowFatDown as ArrowFatDownIcon } from '@phosphor-icons/react';
import Autocomplete from '.';
import React from 'react';

jest.mock('@phosphor-icons/react', () => ({
  ArrowFatDown: () => <div>ArrowFatDownIcon</div>,
  CaretDown: () => <div>CaretDownIcon</div>,
  XCircle: () => <div>CloseIcon</div>,
  MagnifyingGlass: () => <div>MagnifyingGlassIcon</div>,
}));

const options: AutocompleteOption[] = [
  { label: 'mock-label-1', value: 'mock-value-1' },
  { label: 'mock-label-2', value: 'mock-value-2' },
  { label: 'mock-label-3', value: 'mock-value-3' },
];

describe('<Autocomplete />', () => {
  it('renders', () => {
    render(<Autocomplete options={options} />);
  });

  it('renders Blueshift UI TextField by default', () => {
    render(<Autocomplete options={options} />);

    const input = screen.getByRole('combobox');

    expect(input).toBeInTheDocument();
  });

  it('renders custom popupIcon', () => {
    render(<Autocomplete options={options} popupIcon={<ArrowFatDownIcon />} />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('ArrowFatDownIcon')).toBeInTheDocument();
  });

  it('forwards props to Blueshift UI TextField', () => {
    const inputProps = {
      placeholder: 'Test placeholder',
    };

    render(
      <Autocomplete
        InputProps={{
          renderInputProps: inputProps,
        }}
        options={options}
      />
    );

    // Verify the input has the placeholder attribute
    const input = screen.getByRole('combobox');
    expect(input).toHaveAttribute('placeholder', 'Test placeholder');
  });
});
