import React, { useContext } from 'react';
import TrackInteractionContext from '.';
import logHandledError from '../../helpers/log-handled-error';
import { render } from '@testing-library/react';

const mockLogHandledError = logHandledError as jest.MockedFunction<typeof logHandledError>;

jest.mock('../../helpers/log-handled-error');

describe('TrackInteractionContext', () => {
  it('logs error when referenced without a provider present', () => {
    function ComponentThatUsesContext() {
      const { trackEvent } = useContext(TrackInteractionContext);
      trackEvent({ action: 'mock-action', category: 'mock-category' });
      return null;
    }

    render(<ComponentThatUsesContext />);

    expect(mockLogHandledError).toHaveBeenCalledTimes(1);
    expect(mockLogHandledError).toHaveBeenCalledWith(
      'Missing `TrackInteractionProvider`. Components that use `trackEvent` need to be wrapped in a `TrackInteractionProvider`'
    );
  });
});
