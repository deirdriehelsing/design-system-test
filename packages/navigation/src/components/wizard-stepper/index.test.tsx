import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import WizardStepper from '.';
import { useScrollDirection } from 'react-use-scroll-direction';

jest.mock('./index.css', () => ({ scrolling: 'scrolling' }));
jest.mock('react-use-scroll-direction');
const mockUseScrollDirection = useScrollDirection as jest.Mock;

const steps = [
  { icon: () => <div data-testid="icon1" />, text: 'Step 1' },
  { icon: () => <div data-testid="icon2" />, text: 'Step 2' },
];

describe('<WizardStepper />', () => {
  beforeEach(() => {
    mockUseScrollDirection.mockReturnValue({});
  });

  it('renders steps', () => {
    render(<WizardStepper currentStepIndex={1} steps={steps} />);

    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.queryByTestId('icon1')).not.toBeInTheDocument(); // it shows check instead of icon
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByTestId('icon2')).toBeInTheDocument();

    // generates a unique ID for each step
    expect(screen.getByText('Step 1').getAttribute('id')).toMatch(/stepper-:\w+:-step-\d-text/);

    const listItems = screen.getAllByRole('listitem');

    expect(listItems).toHaveLength(2);

    const step1 = listItems[0];
    const step2 = listItems[1];

    expect(step1).not.toHaveAttribute('aria-current');
    expect(step2).toHaveAttribute('aria-current', 'step');
  });

  it('can hide on scroll', () => {
    mockUseScrollDirection.mockReturnValue({
      isScrollingDown: true,
      isScrollingUp: false,
    });

    const { container, rerender } = render(
      <WizardStepper anchor="top" autoHide="mobile" currentStepIndex={1} fixed steps={steps} />
    );

    expect(container.firstChild).toHaveClass('scrolling');

    mockUseScrollDirection.mockReturnValue({
      isScrollingDown: false,
      isScrollingUp: true,
    });

    rerender(<WizardStepper anchor="top" autoHide="mobile" currentStepIndex={1} steps={steps} />);

    expect(container.firstChild).not.toHaveClass('scrolling');
  });

  it('renders with mobileSimplified prop and shows number-only icons', () => {
    render(<WizardStepper currentStepIndex={1} mobileSimplified steps={steps} />);

    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Check Icon')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
