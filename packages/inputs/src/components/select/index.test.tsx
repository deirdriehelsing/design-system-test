import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Select from '.';
import userEvent from '@testing-library/user-event';

const mockedUseBreakpoints = jest.fn(() => ({ isSmallViewport: true }));

jest.mock('@blueshift-ui/theme/dist/hooks/use-breakpoints', () => () => mockedUseBreakpoints());

const MOCK_CUSTOM_PROP_VALUE = 'mock-custom-value';

function _customOptionComponentProps(option, selected) {
  return { customProp: MOCK_CUSTOM_PROP_VALUE, option, selected };
}

function _CustomOptionComponent({ customProp, option, selected }) {
  return (
    <div aria-selected={selected} role="option">
      <div className="label">
        {option.label} - {customProp}
      </div>
    </div>
  );
}

const props = {
  options: [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ],
};

describe.each([
  { isSmallViewport: true, viewport: 'small' },
  { isSmallViewport: false, viewport: 'non-small' },
])('<Select />', ({ isSmallViewport, viewport }) => {
  describe(`when using a ${viewport} viewport`, () => {
    beforeEach(() => {
      mockedUseBreakpoints.mockReturnValueOnce({ isSmallViewport });
    });

    it('renders', () => {
      render(<Select {...props} />);

      expect(screen.getAllByRole('combobox').length).toBe(1);
    });

    it('should display a label', () => {
      render(<Select {...props} label="mock-label" labelId="mock-label-id" />);

      // MUI implementation renders label twice
      const label = screen.getAllByLabelText('mock-label')[0];

      expect(label).toBeInTheDocument();
    });

    it('should display a helper text', async () => {
      render(<Select {...props} helperText="mock-helper-text" />);

      const helperText = await screen.findByText('mock-helper-text');

      expect(helperText).toBeInTheDocument();
    });

    it('should correctly call change callback', async () => {
      const user = userEvent.setup();
      const onChangeMock = jest.fn();
      const firstOptionValue = props.options[0].value;
      render(
        <Select {...props} label="mock-label" labelId="mock-label-id" onChange={onChangeMock} />
      );

      // Open menu
      const select = await screen.findByRole('combobox');
      await user.click(select);

      // Pick option
      const options = await screen.findAllByRole<HTMLOptionElement | HTMLLIElement>('option');
      const firstOption = options[0];
      await user.click(firstOption);

      await waitFor(() => {
        expect(onChangeMock).toHaveBeenCalledTimes(1);
      });

      expect(onChangeMock.mock.calls[0][0].target.value).toBe(firstOptionValue);
    });

    it('should set the given value', () => {
      const mockOptions = [...props.options, { label: 'Mock Option', value: 'mock-value' }];
      render(<Select {...props} options={mockOptions} value="mock-value" />);

      const input = screen.getByRole('textbox', { hidden: true });
      expect(input).toHaveValue('mock-value');
    });

    describe('with a custom option component', () => {
      it('should use the custom component for the options', async () => {
        const firstOptionLabel = props.options[0].label;

        const user = userEvent.setup();

        render(
          <Select
            {...props}
            optionComponent={_CustomOptionComponent}
            optionComponentProps={_customOptionComponentProps}
          />
        );

        // Open menu
        const select = screen.getByRole('combobox');
        await user.click(select);

        const options = screen.getAllByRole('option');
        expect(options).toHaveLength(6);

        const firstOption = options[0];

        expect(firstOption.firstChild).toContainHTML(
          `<div aria-selected="false" role="option"><div class="label">${firstOptionLabel} - ${MOCK_CUSTOM_PROP_VALUE}</div></div>`
        );
      });

      it('should use the custom component for the selected option', async () => {
        const firstOptionLabel = props.options[0].label;

        const user = userEvent.setup();

        render(
          <Select
            {...props}
            optionComponent={_CustomOptionComponent}
            optionComponentProps={_customOptionComponentProps}
          />
        );

        // Open menu
        const select = screen.getByRole('combobox');
        await user.click(select);

        // Pick first option
        const options = screen.getAllByRole('option');
        await user.click(options[0]);

        expect(screen.getByRole('combobox')).toContainHTML(
          `<div aria-selected="true" role="option"><div class="label">${firstOptionLabel} - ${MOCK_CUSTOM_PROP_VALUE}</div></div>`
        );
      });
    });
  });
});
