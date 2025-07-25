import React from 'react';
import TrackInteractionProvider from '.';
import { render } from '@testing-library/react';

jest.mock('./hooks/use-event-tracker', () => () => ({ tracker: jest.fn() }));

describe('<TrackInteractionProvider />', () => {
  it('renders without error', () => {
    render(
      <TrackInteractionProvider applicationId="mock-application-id">
        Test Content…
      </TrackInteractionProvider>
    );
  });
});
