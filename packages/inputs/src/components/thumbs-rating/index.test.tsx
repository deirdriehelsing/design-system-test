import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import ThumbsRating from '.';
import userEvent from '@testing-library/user-event';

jest.mock('@blueshift-ui/i18n/dist/hooks/use-translation', () => () => ({
  translate: (key: string, { context }: { context: string }) =>
    !context ? key : `${key}_${context}`,
}));
jest.mock('./index.css', () => ({
  button: {},
}));

jest.mock('@blueshift-ui/core/dist/components/round-button', () => {
  return jest.fn(({ children, onClick, 'aria-label': ariaLabel, disabled, ...props }) => (
    <button aria-label={ariaLabel} disabled={disabled} onClick={onClick} {...props}>
      {children}
    </button>
  ));
});

describe('<ThumbsRating />', () => {
  it('renders', () => {
    render(<ThumbsRating />);
  });

  it('renders a label', () => {
    render(<ThumbsRating label="Test label" />);

    expect(screen.getByText('Test label')).toBeInTheDocument();
  });

  it('renders a helper text', () => {
    render(<ThumbsRating helperText="Test helper text" />);

    expect(screen.getByText('Test helper text')).toBeInTheDocument();
  });

  it('supports tooltips', async () => {
    const user = userEvent.setup();

    render(
      <ThumbsRating
        downTooltipProps={{ title: 'Test down tooltip' }}
        upTooltipProps={{ title: 'Test up tooltip' }}
      />
    );

    expect(screen.queryByText('Test up tooltip')).not.toBeInTheDocument();
    expect(screen.queryByText('Test down tooltip')).not.toBeInTheDocument();

    await user.hover(screen.getByRole('button', { name: /thumbs_button_label_up/i }));

    expect(await screen.findByText('Test up tooltip')).toBeInTheDocument();

    await user.hover(screen.getByRole('button', { name: /thumbs_button_label_down/i }));

    expect(await screen.findByText('Test down tooltip')).toBeInTheDocument();
  });

  it('handles clicks', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(<ThumbsRating onChange={onChange} />);

    const thumbsUpButton = screen.getByRole('button', { name: /thumbs_button_label_up/i });
    const thumbsUpDown = screen.getByRole('button', { name: /thumbs_button_label_down/i });

    // Select thumbs up
    await user.click(thumbsUpButton);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    expect(onChange).toHaveBeenCalledWith('up');

    // Select thumbs down
    await user.click(thumbsUpDown);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    expect(onChange).toHaveBeenCalledWith('down');

    // Deselect thumbs down
    await user.click(thumbsUpDown);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(3);
    });

    expect(onChange).toHaveBeenCalledWith(null);
  });
});
