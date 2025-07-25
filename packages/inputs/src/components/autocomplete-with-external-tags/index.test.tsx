import { render, screen } from '@testing-library/react';
import AutocompleteWithExternalTags from '.';
import React from 'react';
import userEvent from '@testing-library/user-event';

jest.mock('@phosphor-icons/react', () => ({
  CaretDown: () => <div>CaretDownIcon</div>,
  XCircle: () => <div>CancelIcon</div>,
  MagnifyingGlass: () => <div>MagnifyingGlass</div>,
}));

describe('AutocompleteWithExternalTags', () => {
  it('renders without crashing', () => {
    render(<AutocompleteWithExternalTags id="title" onChange={() => {}} options={[]} value={[]} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('allows users to add a chip selecting the option with keyboard', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <AutocompleteWithExternalTags
        id="title"
        onChange={handleChange}
        options={[{ title: 'Test Movie', year: 2021 }]}
        value={[]}
      />
    );

    await user.type(screen.getByRole('combobox'), 'Test Movie');
    await user.keyboard('{arrowdown}{enter}');

    expect(handleChange).toHaveBeenCalledWith([{ title: 'Test Movie', year: 2021 }]);
  });

  it('allows users to add a chip selecting the option with mouse', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <AutocompleteWithExternalTags
        id="title"
        onChange={handleChange}
        options={[{ title: 'Test Movie', year: 2021 }]}
        value={[]}
      />
    );

    await user.type(screen.getByRole('combobox'), 'Test Movie');
    await user.click(screen.getByRole('option', { name: 'Test Movie' }));

    expect(handleChange).toHaveBeenCalledWith([{ title: 'Test Movie', year: 2021 }]);
  });

  it('allows users to remove a chip', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    const initialOptions = [{ title: 'Test Movie', year: 2021 }];

    render(
      <AutocompleteWithExternalTags
        id="title"
        onChange={handleChange}
        options={initialOptions}
        value={initialOptions}
      />
    );

    // The second one is the input's clear icon
    const [chipClearIcon] = screen.getAllByText('CancelIcon');
    await user.click(chipClearIcon);
    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it('shows circular progress when loading is true', () => {
    const handleChange = jest.fn();
    const handleOnOpen = jest.fn();
    const initialOptions = [{ title: 'Test Movie', year: 2021 }];

    render(
      <AutocompleteWithExternalTags
        id="title"
        loading
        onChange={handleChange}
        onOpen={handleOnOpen}
        options={initialOptions}
        value={initialOptions}
      />
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('executes callback when opening select options box', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    const handleOnOpen = jest.fn();
    const initialOptions = [{ title: 'Test Movie', year: 2021 }];

    render(
      <AutocompleteWithExternalTags
        id="title"
        onChange={handleChange}
        onOpen={handleOnOpen}
        options={initialOptions}
        value={initialOptions}
      />
    );

    await user.click(screen.getByRole('combobox'));

    expect(handleOnOpen).toHaveBeenCalled();
  });

  it('executes callback when closing select options box', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    const handleOnClose = jest.fn();
    const initialOptions = [{ title: 'Test Movie', year: 2021 }];

    render(
      <AutocompleteWithExternalTags
        id="title"
        onChange={handleChange}
        onClose={handleOnClose}
        options={initialOptions}
        value={initialOptions}
      />
    );

    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByRole('combobox'));

    expect(handleOnClose).toHaveBeenCalled();
  });
});
