import React from 'react';
import StepIndicator from '.';
import { render } from '@testing-library/react';

describe('<StepIndicator />', () => {
  it('renders', () => {
    render(<StepIndicator />);
  });

  it.each([
    { active: true, className: 'BlueshiftStep-active', completed: true },
    { active: true, className: 'BlueshiftStep-active', completed: false },
    { active: false, className: 'BlueshiftStep-completed', completed: true },
    { active: false, className: 'BlueshiftStep-pending', completed: false },
  ])(
    'applies $className class when active is $active and completed is $completed',
    ({ active, className, completed }) => {
      const { container } = render(<StepIndicator active={active} completed={completed} />);

      expect(container.firstChild).toHaveClass(className);
    }
  );
});
