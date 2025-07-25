import * as styles from './index.css';
import { render, screen } from '@testing-library/react';
import { Pen } from '@phosphor-icons/react';
import React from 'react';
import StepIcon from '.';

jest.mock('./index.css', () => ({
  checkSvg: 'checkSvg',
  showOnDesktop: 'showOnDesktop',
  showOnMobile: 'showOnMobile',
}));

// <span> was too verbose
jest.mock('@phosphor-icons/react', () => ({
  __esModule: true,
  Pen: ({ className, ...rest }: { className?: string }) =>
    React.createElement('span', { className, ...rest }, 'Pen Icon'),
  Check: ({ className, ...rest }: { className?: string }) =>
    React.createElement('span', { className, ...rest }, 'Check Icon'),
  CheckCircle: ({ className, ...rest }: { className?: string }) =>
    React.createElement('span', { className, ...rest }, 'CheckCircle Icon'),
}));

describe('<StepIcon />', () => {
  const baseProps = {
    iconComponent: Pen,
    index: 1,
  };

  it('renders the Pen icon with both mobile+desktop classes when not simplified & not completed', () => {
    render(<StepIcon {...baseProps} mobileSimplified={false} stepIsCompleted={false} />);
    const icon = screen.getByText('Pen Icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass(styles.showOnDesktop, styles.showOnMobile);
  });

  it('renders CheckCircle with both mobile+desktop classes when not simplified & completed', () => {
    render(<StepIcon {...baseProps} mobileSimplified={false} stepIsCompleted={true} />);
    const checkCircle = screen.getByText('CheckCircle Icon');
    expect(checkCircle).toBeInTheDocument();
    expect(checkCircle).toHaveClass(styles.showOnDesktop, styles.showOnMobile);
  });

  it('renders only the mobile “2” span and desktop icon when simplified & not completed', () => {
    render(<StepIcon {...baseProps} mobileSimplified={true} stepIsCompleted={false} />);
    const number = screen.getByText('2');
    expect(number).toBeInTheDocument();
    expect(number).toHaveClass(styles.showOnMobile);
    expect(number).not.toHaveClass(styles.showOnDesktop);

    const icon = screen.getByText('Pen Icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass(styles.showOnDesktop);
    expect(icon).not.toHaveClass(styles.showOnMobile);
  });

  it('renders mobile Check and desktop CheckCircle when simplified & completed', () => {
    render(<StepIcon {...baseProps} mobileSimplified={true} stepIsCompleted={true} />);

    const mobileCheck = screen.getByText('Check Icon');
    expect(mobileCheck).toBeInTheDocument();
    expect(mobileCheck).toHaveClass(styles.checkSvg);

    const desktopCheck = screen.getByText('CheckCircle Icon');
    expect(desktopCheck).toBeInTheDocument();
    expect(desktopCheck).toHaveClass(styles.showOnDesktop);
    expect(desktopCheck).not.toHaveClass(styles.showOnMobile);
  });
});
