import type { InteractionSchema, SegmentTracker } from '@varsitytutors/event-tracker';

import logHandledError from '../../../../../../helpers/log-handled-error';
import trackSegmentTracker from '.';

const mockLogHandledError = logHandledError as jest.MockedFunction<typeof logHandledError>;

jest.mock('@varsitytutors/event-tracker');
jest.mock('../../../../../../helpers/log-handled-error');

describe('trackSegmentTracker', () => {
  const mockTrack = jest.fn();
  const mockSegmentTracker: SegmentTracker = { track: mockTrack } as unknown as SegmentTracker;

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
    mockTrack.mockResolvedValue({ success: true, message: '' });
  });

  it('should not track if actionTracker is null', async () => {
    await trackSegmentTracker(null, mockInteractionSchema);
    expect(mockLogHandledError).not.toHaveBeenCalled();
  });

  it('should log info and return if SegmentTracker is null in development env', async () => {
    const testOriginEnvironment = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    // Act
    await trackSegmentTracker(null, mockInteractionSchema);

    // Assert
    expect(mockLogHandledError).not.toHaveBeenCalled();
    process.env.NODE_ENV = testOriginEnvironment;
  });

  it('should call track on SegmentTracker and log errors', async () => {
    mockTrack.mockResolvedValue({ success: false, message: 'Test Error' });

    // Act
    await trackSegmentTracker(mockSegmentTracker, mockInteractionSchema);

    // Assert
    expect(mockTrack).toHaveBeenCalledWith({
      eventName: mockInteractionSchema.customEventData?.action,
      properties: mockInteractionSchema,
    });
    expect(mockLogHandledError).toHaveBeenCalledWith(
      'SegmentTracker: Error tracking user interaction event',
      { message: 'Test Error' }
    );
  });

  it('should call track on SegmentTracker successfully', async () => {
    await trackSegmentTracker(mockSegmentTracker, mockInteractionSchema);

    expect(mockTrack).toHaveBeenCalledWith({
      eventName: mockInteractionSchema.customEventData?.action,
      properties: mockInteractionSchema,
    });
    expect(mockLogHandledError).not.toHaveBeenCalled();
  });
});
