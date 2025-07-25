import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import filterCustomProps from './index';

describe('filterCustomProps', () => {
  it('should render div by default', () => {
    const FilteredComponent = filterCustomProps(['testProp'], 'div');
    render(<FilteredComponent data-testid="test-component" />);

    const component = screen.getByTestId('test-component');
    expect(component.tagName).toBe('DIV');
  });

  it('should render specified component', () => {
    const FilteredComponent = filterCustomProps(['testProp'], 'span');
    render(<FilteredComponent data-testid="test-component" />);

    const component = screen.getByTestId('test-component');
    expect(component.tagName).toBe('SPAN');
  });

  it('should filter specified props', () => {
    const FilteredComponent = filterCustomProps(['testProp', 'anotherProp'], 'div');
    render(
      <FilteredComponent
        anotherProp="also-filtered"
        data-testid="test-component"
        data-valid="should-exist"
        testProp="should-be-filtered"
      />
    );

    const component = screen.getByTestId('test-component');
    expect(component).not.toHaveAttribute('testProp');
    expect(component).not.toHaveAttribute('anotherProp');
    expect(component).toHaveAttribute('data-valid', 'should-exist');
  });

  it('should support ref forwarding', () => {
    const FilteredComponent = filterCustomProps(['testProp'], 'div');
    const ref = React.createRef<HTMLDivElement>();

    render(<FilteredComponent data-testid="test-component" ref={ref} />);

    const component = screen.getByTestId('test-component');
    expect(ref.current).toBe(component);
  });

  it('should support ref forwarding with custom component', () => {
    const FilteredComponent = filterCustomProps(['testProp'], 'section');
    const ref = React.createRef<HTMLDivElement>();

    render(<FilteredComponent data-testid="test-component" ref={ref} />);

    const component = screen.getByTestId('test-component');
    expect(ref.current).toBe(component);
    expect(component.tagName).toBe('SECTION');
  });
});
