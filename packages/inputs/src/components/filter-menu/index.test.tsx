import type {
  FilterMenuMultiSelectOptionsValue,
  FilterMenuSingleSelectOptionsValue,
} from '../../types';

import { render, screen, waitFor } from '@testing-library/react';
import FilterMenu from '.';
import React from 'react';
import useBreakpoints from '@blueshift-ui/theme/dist/hooks/use-breakpoints';
import userEvent from '@testing-library/user-event';

const mockUseBreakpoints = useBreakpoints as jest.Mock;

jest.mock('@blueshift-ui/i18n/dist/hooks/use-translation', () => () => ({
  translate: (key: string) => key,
}));
jest.mock('@blueshift-ui/theme/dist/hooks/use-breakpoints');

const props = {
  label: 'Options',
  options: [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ],
};

describe('<FilterMenu />', () => {
  describe.each([{ isSmallViewport: true }, { isSmallViewport: false }])(
    'when isSmallViewport is $isSmallViewport',
    ({ isSmallViewport }) => {
      beforeEach(() => {
        mockUseBreakpoints.mockReturnValue({ isSmallViewport });
      });

      it('renders', () => {
        render(<FilterMenu {...props} />);

        expect(screen.getByText(props.label)).toBeVisible();
      });

      it('handles events', async () => {
        const user = userEvent.setup();

        const mockOnClose = jest.fn();
        const mockOnOpen = jest.fn();

        render(<FilterMenu {...props} onClose={mockOnClose} onOpen={mockOnOpen} />);

        expect(screen.getByText(props.label)).toBeVisible();

        await user.click(screen.getByText(props.label));

        await waitFor(() => {
          expect(mockOnOpen).toHaveBeenCalled();
        });

        const optionButton = await screen.findByRole('button', { name: props.options[0].label });
        expect(optionButton).toBeVisible();

        await user.click(optionButton);

        await waitFor(() => {
          expect(mockOnClose).toHaveBeenCalled();
        });
      });

      it('renders options', async () => {
        const user = userEvent.setup();

        render(<FilterMenu {...props} />);

        expect(screen.getByText(props.label)).toBeVisible();

        await user.click(screen.getByText(props.label));

        expect(props.options.length).toBeGreaterThan(0);

        await Promise.all(
          props.options.map(
            async (option) =>
              await expect(await screen.findByRole('button', { name: option.label })).toBeVisible()
          )
        );
      });

      it('displays selected option', async () => {
        const user = userEvent.setup();

        render(<FilterMenu {...props} />);

        expect(screen.getByText(props.label)).toBeVisible();

        await user.click(screen.getByText(props.label));

        await waitFor(() => {
          expect(screen.getByRole('button', { name: props.options[0].label })).toBeVisible();
        });

        await user.click(screen.getByRole('button', { name: props.options[0].label }));

        await waitFor(() => {
          expect(screen.queryByText(props.label)).not.toBeInTheDocument();
        });

        expect(screen.getByText(props.options[0].label)).toBeVisible();
      });

      it('handles selection', async () => {
        const user = userEvent.setup();

        let mockValue: FilterMenuSingleSelectOptionsValue = undefined;

        const mockOnChange = jest.fn((newValue: FilterMenuSingleSelectOptionsValue) => {
          mockValue = newValue;
        });

        render(<FilterMenu {...props} onChange={mockOnChange} value={mockValue} />);

        expect(screen.getByText(props.label)).toBeVisible();

        await user.click(screen.getByText(props.label));

        expect(props.options.length).toBeGreaterThan(0);

        await Promise.all(
          props.options.map(async (option) =>
            expect(await screen.findByRole('button', { name: option.label })).toBeVisible()
          )
        );

        const selectedOption = props.options[1];
        const selectedOptionName = `Check Icon ${selectedOption.label}`;

        await user.click(screen.getByRole('button', { name: selectedOption.label }));

        expect(mockOnChange).toHaveBeenCalledTimes(1);
        expect(mockOnChange).toHaveBeenCalledWith(selectedOption.value);

        expect(await screen.findByText(selectedOption.label)).toBeVisible();

        await user.click(screen.getByText(selectedOption.label));

        await Promise.all(
          props.options.map(
            async (option) =>
              await expect(
                screen.queryByRole('button', {
                  name: selectedOption.value === option.value ? selectedOptionName : option.label,
                })
              ).toBeVisible()
          )
        );

        await user.click(screen.getByRole('button', { name: selectedOptionName }));

        expect(mockOnChange).toHaveBeenCalledTimes(2);
        expect(mockOnChange).toHaveBeenCalledWith(undefined);
      });

      describe('when multiple is true', () => {
        const propsWithMultiple = { ...props, multiple: true as const };

        it('renders', () => {
          render(<FilterMenu {...propsWithMultiple} />);

          expect(screen.getByText(propsWithMultiple.label)).toBeVisible();
        });

        it('renders options', async () => {
          const user = userEvent.setup();

          render(<FilterMenu {...propsWithMultiple} />);

          expect(screen.getByText(propsWithMultiple.label)).toBeVisible();

          await user.click(screen.getByText(propsWithMultiple.label));

          expect(propsWithMultiple.options.length).toBeGreaterThan(0);

          await Promise.all(
            propsWithMultiple.options.map(
              async (option) => await expect(screen.queryByText(option.label)).toBeVisible()
            )
          );

          expect(await screen.findAllByRole('checkbox')).toHaveLength(
            propsWithMultiple.options.length
          );

          expect(await screen.findByText('filter_menu_button_apply')).toBeVisible();
          expect(await screen.findByText('filter_menu_button_clear')).toBeVisible();
        });

        it('displays selected options count', async () => {
          const user = userEvent.setup();
          const selectedOptions = [propsWithMultiple.options[0], propsWithMultiple.options[2]];

          expect(selectedOptions.length).toBeGreaterThan(0);

          render(<FilterMenu {...propsWithMultiple} />);

          expect(screen.getByText(propsWithMultiple.label)).toBeVisible();

          await user.click(screen.getByText(propsWithMultiple.label));

          await Promise.all(
            selectedOptions.map(
              async (selectedOption) =>
                await expect(await screen.findByText(selectedOption.label)).toBeVisible()
            )
          );

          expect(await screen.findByText('filter_menu_button_apply')).toBeVisible();

          await Promise.all(
            selectedOptions.map(
              async (selectedOption) => await user.click(screen.getByText(selectedOption.label))
            )
          );

          await user.click(screen.getByText('filter_menu_button_apply'));

          await waitFor(() => {
            expect(screen.queryByText(propsWithMultiple.label)).not.toBeInTheDocument();
          });

          expect(
            await screen.findByText(`${propsWithMultiple.label} (${selectedOptions.length})`)
          ).toBeVisible();
        });

        it('handles changes', async () => {
          const user = userEvent.setup();

          expect(propsWithMultiple.options.length).toBeGreaterThan(0);

          let mockValue: FilterMenuMultiSelectOptionsValue = undefined;

          const mockOnChange = jest.fn((newValue: FilterMenuMultiSelectOptionsValue) => {
            mockValue = newValue;
          });

          render(<FilterMenu {...propsWithMultiple} onChange={mockOnChange} value={mockValue} />);

          expect(screen.getByText(propsWithMultiple.label)).toBeVisible();

          await user.click(screen.getByText(propsWithMultiple.label));

          await Promise.all(
            propsWithMultiple.options.map(
              async (option) => await expect(await screen.findByText(option.label)).toBeVisible()
            )
          );

          expect(await screen.findAllByRole('checkbox')).toHaveLength(
            propsWithMultiple.options.length
          );
          expect(await screen.findByText('filter_menu_button_apply')).toBeVisible();
          expect(await screen.findByText('filter_menu_button_clear')).toBeVisible();

          const selectedOptions = [propsWithMultiple.options[0], propsWithMultiple.options[2]];

          await Promise.all(
            selectedOptions.map(
              async (selectedOption) => await user.click(screen.getByText(selectedOption.label))
            )
          );

          expect(mockOnChange).not.toHaveBeenCalled();

          await user.click(screen.getByText('filter_menu_button_apply'));

          expect(mockOnChange).toHaveBeenCalledTimes(1);
          expect(mockOnChange).toHaveBeenCalledWith(
            selectedOptions.map((selectedOption) => selectedOption.value)
          );

          await user.click(
            screen.getByText(`${propsWithMultiple.label} (${selectedOptions.length})`)
          );

          await user.click(screen.getByText(selectedOptions[0].label));

          expect(mockOnChange).toHaveBeenCalledTimes(1);

          await user.click(screen.getByText('filter_menu_button_apply'));

          expect(mockOnChange).toHaveBeenCalledTimes(2);
          expect(mockOnChange).toHaveBeenCalledWith([selectedOptions[1].value]);

          await user.click(
            screen.getByText(`${propsWithMultiple.label} (${selectedOptions.length - 1})`)
          );

          expect(screen.getByText('filter_menu_button_clear')).toBeVisible();
          expect(screen.getByText('filter_menu_button_apply')).toBeVisible();

          await user.click(screen.getByText('filter_menu_button_clear'));
          await user.click(screen.getByText('filter_menu_button_apply'));

          expect(mockOnChange).toHaveBeenCalledTimes(3);
          expect(mockOnChange).toHaveBeenCalledWith([]);
        });
      });
    }
  );
});
