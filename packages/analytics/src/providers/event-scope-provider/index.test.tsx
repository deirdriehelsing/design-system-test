import '@testing-library/jest-dom';
import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import { EventScopeContext } from '../../state';
import EventScopeProvider from './index';

describe('<EventScopeProvider />', () => {
  function TestComponent() {
    const eventScope = useContext(EventScopeContext);

    return (
      <div data-testid="event-scope">{eventScope ? JSON.stringify(eventScope) : 'No scope'}</div>
    );
  }

  it('renders children', () => {
    render(
      <EventScopeProvider eventScope={{ pageSection: 'test-section' }}>
        <div data-testid="child">Child Content</div>
      </EventScopeProvider>
    );

    expect(screen.getByTestId('child')).toHaveTextContent('Child Content');
  });

  it('hydrates the event scope atom with provided scope', () => {
    render(
      <EventScopeProvider eventScope={{ pageSection: 'test-section' }}>
        <TestComponent />
      </EventScopeProvider>
    );

    expect(screen.getByText(/test-section/)).toBeInTheDocument();
  });

  it('updates the event scope atom when the event scope prop changes', () => {
    const { rerender } = render(
      <EventScopeProvider eventScope={{ pageSection: 'first-section' }}>
        <TestComponent />
      </EventScopeProvider>
    );

    expect(screen.getByText(/first-section/)).toBeInTheDocument();

    rerender(
      <EventScopeProvider eventScope={{ pageSection: 'second-section' }}>
        <TestComponent />
      </EventScopeProvider>
    );

    expect(screen.getByText(/second-section/)).toBeInTheDocument();
  });

  it('inherits event scope from parent', () => {
    render(
      <EventScopeProvider
        eventScope={{ metadata: { foo: 'parent-metadata' }, pageSection: 'parent-section' }}
      >
        <EventScopeProvider
          eventScope={{ metadata: { bar: 'child-metadata' }, pageSection: 'child-section' }}
          inheritParentScope={true}
        >
          <TestComponent />
        </EventScopeProvider>
      </EventScopeProvider>
    );

    expect(screen.getByTestId('event-scope')).not.toHaveTextContent('parent-section');
    expect(screen.getByTestId('event-scope')).toHaveTextContent('child-section');
    expect(screen.getByTestId('event-scope')).toHaveTextContent('parent-metadata');
    expect(screen.getByTestId('event-scope')).toHaveTextContent('child-metadata');
  });

  it('does not inherit event scope from parent if inheritParentScope is false', () => {
    render(
      <EventScopeProvider
        eventScope={{ metadata: { foo: 'parent-metadata' }, pageSection: 'parent-section' }}
      >
        <EventScopeProvider
          eventScope={{ metadata: { bar: 'child-metadata' }, pageSection: 'child-section' }}
          inheritParentScope={false}
        >
          <TestComponent />
        </EventScopeProvider>
      </EventScopeProvider>
    );

    expect(screen.getByTestId('event-scope')).not.toHaveTextContent('parent-section');
    expect(screen.getByTestId('event-scope')).toHaveTextContent('child-section');
    expect(screen.getByTestId('event-scope')).not.toHaveTextContent('parent-metadata');
    expect(screen.getByTestId('event-scope')).toHaveTextContent('child-metadata');
  });
});
