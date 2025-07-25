import { render, screen } from '@testing-library/react';
import Rating from '.';
import React from 'react';
import userEvent from '@testing-library/user-event';

jest.mock('@phosphor-icons/react', () => ({
  Star: ({ weight }) => <div>StarIcon {weight}</div>,
}));

describe('<Rating />', () => {
  it('renders', () => {
    render(<Rating />);
  });

  it('should display a label', () => {
    render(<Rating label="mock-label" labelId="mock-label-id" />);

    const label = screen.getByLabelText('mock-label');

    expect(label).toBeInTheDocument();
  });

  it('should accept a default value', () => {
    render(<Rating defaultValue={3} />);

    const checkedInput = screen.getByRole('radio', { checked: true });
    expect(checkedInput).toHaveAttribute('value', '3');
  });

  it('should accept a value', () => {
    render(<Rating value={3} />);

    const checkedInput = screen.getByRole('radio', { checked: true });
    expect(checkedInput).toHaveAttribute('value', '3');
  });

  it('should not change rating value when user clicks a rating element', async () => {
    const mockOnChange = jest.fn();
    const user = userEvent.setup();

    render(<Rating onChange={mockOnChange} readOnly={true} />);

    const icons = screen.getAllByRole('img');

    await user.click(icons[2]);

    expect(mockOnChange).toHaveBeenCalledTimes(0);
  });

  it('displays the correct number of stars when readOnly is true', () => {
    render(<Rating readOnly={true} value={3} />);

    const filledStars = screen.getAllByText('StarIcon fill');
    const emptyStars = screen.getAllByText('StarIcon regular');

    expect(filledStars).toHaveLength(3);
    expect(emptyStars).toHaveLength(2);
  });
});
