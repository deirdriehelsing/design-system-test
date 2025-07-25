import * as styles from './index.css';
import { render, screen } from '@testing-library/react';
import React from 'react';
import StepProgress from '.';

jest.mock('./index.css', () => ({
  bar: 'bar',
  barMobile: 'barMobile',
  showOnMobile: 'showOnMobile',
  showOnDesktop: 'showOnDesktop',
  hideLast: 'hideLast',
}));

jest.mock('@blueshift-ui/core/dist/components/linear-progress', () => ({
  __esModule: true,
  default: (props: any) => <span data-testid="LinearProgress" {...props} />,
}));

describe('StepProgress', () => {
  const stepTextId = 'step-label-id';

  it('renders a <div> for desktop (mobileSimplified=false)', () => {
    render(
      <StepProgress
        isLastStep={false}
        mobileSimplified={false}
        progressValueNow={0.5}
        stepTextId={stepTextId}
      />
    );

    const progressDiv = screen.getByRole('progressbar');
    expect(progressDiv.tagName).toBe('DIV');
    expect(progressDiv).toHaveClass(styles.bar, styles.showOnDesktop, styles.showOnMobile);
    expect(progressDiv).toHaveAttribute('aria-labelledby', stepTextId);
    expect(progressDiv).toHaveAttribute('aria-valuenow', '0.5');
    expect(screen.queryByTestId('LinearProgress')).toBeNull();
  });

  it('renders both <div> and LinearProgress on mobile simplified when not last', () => {
    render(
      <StepProgress
        isLastStep={false}
        mobileSimplified={true}
        progressValueNow={1}
        stepTextId={stepTextId}
      />
    );

    const allBars = screen.getAllByRole('progressbar');
    const divBars = allBars.filter((el) => el.tagName.toLowerCase() === 'div');
    expect(divBars).toHaveLength(1);
    expect(divBars[0]).toHaveClass(styles.bar, styles.showOnDesktop);

    const lp = screen.getByTestId('LinearProgress');
    expect(lp).toBeInTheDocument();
    expect(lp.tagName.toLowerCase()).toBe('span');
    expect(lp).toHaveClass(styles.showOnMobile);
    expect(lp).not.toHaveClass(styles.hideLast);
    expect(lp).toHaveAttribute('aria-labelledby', stepTextId);
    expect(lp).toHaveAttribute('value', '100');
    expect(lp).toHaveAttribute('variant', 'determinate');
  });

  it('applies hideLast class when isLastStep=true in mobile simplified mode', () => {
    render(
      <StepProgress
        isLastStep={true}
        mobileSimplified={true}
        progressValueNow={0}
        stepTextId={stepTextId}
      />
    );

    const lp = screen.getByTestId('LinearProgress');
    expect(lp).toHaveClass(styles.showOnMobile, styles.hideLast);

    const allBars = screen.getAllByRole('progressbar');
    const divBars = allBars.filter((el) => el.tagName.toLowerCase() === 'div');
    expect(divBars).toHaveLength(1);
    expect(divBars[0]).toHaveClass(styles.bar, styles.showOnDesktop);
  });
});
