import { render, screen } from '@testing-library/react';
import React from 'react';
import ViewTracker from './index';
import useViewTracking from '../../hooks/use-view-tracking';

jest.mock('../../hooks/use-view-tracking', () => jest.fn());

describe('ViewTracker', () => {
  const mockAnalytics = { action: 'moc-action', category: 'mock-category' };

  it('calls useViewTracking with the correct parameters', () => {
    render(
      <ViewTracker analytics={mockAnalytics}>
        <div>Test Child</div>
      </ViewTracker>
    );
    expect(useViewTracking).toHaveBeenCalledWith(mockAnalytics);
  });

  it('renders its children correctly', () => {
    const childText = 'Test Child';
    render(
      <ViewTracker analytics={mockAnalytics}>
        <div>{childText}</div>
      </ViewTracker>
    );
    expect(screen.getByText(childText)).toBeInTheDocument();
  });
});
