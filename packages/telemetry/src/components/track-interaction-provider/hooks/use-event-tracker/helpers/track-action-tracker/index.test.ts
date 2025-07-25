import type { ActionTracker, InteractionSchema } from '@varsitytutors/event-tracker';

import logHandledError from '../../../../../../helpers/log-handled-error';
import trackActionTracker from '.';

const mockLogHandledError = logHandledError as jest.MockedFunction<typeof logHandledError>;

jest.mock('@varsitytutors/event-tracker');
jest.mock('../../../../../../helpers/log-handled-error');

describe('trackActionTracker', () => {
  let mockActionTracker: ActionTracker;
  const mockTrack = jest.fn();

  const mockInteractionSchema: InteractionSchema = {
    customEventData: {
      action: 'test_action',
      category: 'test_category',
      label: 'test_label',
    },
    page: {
      url: 'http://test.com',
      userAgent: '',
      divisionId: '',
    },
    domEventData: {
      target: 'page',
    },
    pageRequestId: '123-mock',
  };

  beforeEach(() => {
    jest.resetAllMocks();
    mockActionTracker = {
      track: mockTrack,
    } as unknown as ActionTracker;
  });

  it('should not track if actionTracker is null', async () => {
    await trackActionTracker(null, mockInteractionSchema);
    expect(mockLogHandledError).not.toHaveBeenCalled();
  });

  it('should log info and return if ActionTracker is null in development env', async () => {
    const testOriginEnvironment = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';
    const consoleInfoMock = jest.spyOn(console, 'info');

    // Act
    await trackActionTracker(null, mockInteractionSchema);

    // Assert
    expect(consoleInfoMock).toHaveBeenCalledWith(
      'TrackInteractionProvider: ActionTracker event tracking is disabled',
      {
        action: mockInteractionSchema.customEventData?.action,
        category: mockInteractionSchema.customEventData?.category,
        label: mockInteractionSchema?.customEventData?.label,
      }
    );
    expect(mockLogHandledError).not.toHaveBeenCalled();
    process.env.NODE_ENV = testOriginEnvironment;
  });

  it('should call track on ActionTracker and log errors', async () => {
    mockTrack.mockImplementation(() => {
      throw new Error('Test Error');
    });

    const error = new Error('Test Error');

    // Act
    await trackActionTracker(mockActionTracker, mockInteractionSchema);

    // Assert
    expect(mockTrack).toHaveBeenCalledWith(mockInteractionSchema);
    expect(mockLogHandledError).toHaveBeenCalledWith(
      'ActionTracker: Error tracking user interaction event',
      { error }
    );
  });

  it('should call track on ActionTracker successfully', async () => {
    await trackActionTracker(mockActionTracker, mockInteractionSchema);

    expect(mockTrack).toHaveBeenCalledWith(mockInteractionSchema);
    expect(mockLogHandledError).not.toHaveBeenCalled();
  });
});
