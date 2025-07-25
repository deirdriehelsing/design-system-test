import { render, screen } from '@testing-library/react';
import Paper from '.';
import React from 'react';

describe('<Paper />', () => {
  it('renders', () => {
    render(<Paper id="paper" />);
  });

  it('supports component prop', () => {
    render(<Paper component="section" data-testid="paper" />);

    const paper = screen.getByTestId('paper');

    expect(paper).toBeInTheDocument();
    expect(paper.tagName).toBe('SECTION');
  });

  it('should support ref forwarding', () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Paper data-testid="paper" ref={ref} />);

    expect(ref.current).toBeInTheDocument();
  });

  it('should support ref forwarding with custom component', () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Paper component="section" data-testid="paper" ref={ref} />);

    expect(ref.current).toBeInTheDocument();
    expect(ref.current?.tagName).toBe('SECTION');
  });
});
