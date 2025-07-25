import type { IdentifyEventParams } from '../../../../../../types/identify-event-params';
import type { SegmentTracker } from '@varsitytutors/event-tracker';

import identifySegmentTracker from '.';
import logHandledError from '../../../../../../helpers/log-handled-error';

const mockLogHandledError = logHandledError as jest.MockedFunction<typeof logHandledError>;

jest.mock('@varsitytutors/event-tracker');
jest.mock('../../../../../../helpers/log-handled-error');

describe('identifySegmentTracker', () => {
  const mockIdentify = jest.fn();
  const mockSegmentTracker: SegmentTracker = {
    identify: mockIdentify,
  } as unknown as SegmentTracker;

  const mockIdentifyParams: IdentifyEventParams = {
    userId: 'test_user_id',
    traits: {
      email: 'test_email',
      firstName: 'test_first_name',
      lastName: 'test_last_name',
    },
  };

  beforeEach(() => {
    jest.resetAllMocks();
    mockIdentify.mockResolvedValue({ success: true, message: '' });
  });

  it('should not identify if segmentTracker is null', async () => {
    await identifySegmentTracker(null, mockIdentifyParams);
    expect(mockLogHandledError).not.toHaveBeenCalled();
  });

  it('should log info and return if SegmentTracker is null in development env', async () => {
    const testOriginEnvironment = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    // Act
    await identifySegmentTracker(null, mockIdentifyParams);

    // Assert
    expect(mockLogHandledError).not.toHaveBeenCalled();
    process.env.NODE_ENV = testOriginEnvironment;
  });

  it('should call identify on SegmentTracker and log errors', async () => {
    mockIdentify.mockResolvedValue({ success: false, message: 'Test Error' });

    // Act
    await identifySegmentTracker(mockSegmentTracker, mockIdentifyParams);

    // Assert
    expect(mockIdentify).toHaveBeenCalledWith(mockIdentifyParams);
    expect(mockLogHandledError).toHaveBeenCalledWith('SegmentTracker: Error identifying user', {
      message: 'Test Error',
    });
  });

  it('should call identify on SegmentTracker successfully', async () => {
    await identifySegmentTracker(mockSegmentTracker, mockIdentifyParams);

    expect(mockIdentify).toHaveBeenCalledWith(mockIdentifyParams);
    expect(mockLogHandledError).not.toHaveBeenCalled();
  });
});
