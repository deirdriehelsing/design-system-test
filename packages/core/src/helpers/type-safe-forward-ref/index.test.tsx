import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import TypeSafeForwardRef from './index';

describe('TypeSafeForwardRef', () => {
  interface TestComponentProps {
    label?: string;
    testId: string;
  }

  type TestRef = HTMLDivElement;

  it('should correctly forward refs', () => {
    // Create a component using TypeSafeForwardRef
    const TestComponent = TypeSafeForwardRef<TestRef, TestComponentProps>((props, ref) => (
      <div data-testid={props.testId} ref={ref}>
        {props.label}
      </div>
    ));

    // Create a ref
    const ref = React.createRef<TestRef>();

    // Render the component with the ref
    render(<TestComponent label="Test Label" ref={ref} testId="test-component" />);

    // Assert the ref is correctly forwarded
    const component = screen.getByTestId('test-component');
    expect(ref.current).toBe(component);
    expect(component).toHaveTextContent('Test Label');
  });
});
