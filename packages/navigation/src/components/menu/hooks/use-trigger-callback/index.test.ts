import { bindTrigger } from 'material-ui-popup-state/hooks';
import { renderHook } from '@testing-library/react';
import useTriggerCallback from '.';

const mockedBindTrigger = bindTrigger as jest.Mock;

declare global {
  interface Event {
    isPropagationStopped: jest.Mock;
  }
}

// A SyntheticEvent is used in the real implementaiton, but there's no easy way to instantiate one.
Event.prototype.stopPropagation = jest.fn();
Event.prototype.isPropagationStopped = jest.fn(() => false);

jest.mock('material-ui-popup-state/hooks');

describe('useTriggerCallback()', () => {
  it.each(['onClick', 'onTouchStart'] as const)(
    'applies bindings and triggers for %s event',
    (name) => {
      const mockedBoundHandler = jest.fn();
      const mockedCallback = jest.fn();
      const mockedEvent = new Event('mock');
      const mockedHandler = jest.fn();
      const mockedPopupState = { mock: true } as any;

      mockedBindTrigger.mockReturnValue({
        [name]: mockedBoundHandler,
      });

      const { result } = renderHook(() =>
        useTriggerCallback(name, { [name]: mockedHandler }, mockedPopupState, mockedCallback)
      );

      expect(result.current).toBeInstanceOf(Function);

      result.current(mockedEvent);

      expect(mockedBindTrigger).toHaveBeenCalledWith(mockedPopupState);
      expect(mockedBoundHandler).toHaveBeenCalledWith(mockedEvent);
      expect(mockedHandler).toHaveBeenCalledWith(mockedEvent);
      expect(mockedCallback).toHaveBeenCalledWith(mockedEvent);
    }
  );

  it('stops propagation if callback stops it', () => {
    const mockedBoundHandler = jest.fn();
    const mockedCallback = jest.fn((event) => {
      event.stopPropagation();
      event.isPropagationStopped.mockReturnValue(true);
    });
    const mockedEvent = new Event('mock');
    const mockedHandler = jest.fn();
    const mockedPopupState = { mock: true } as any;

    mockedBindTrigger.mockReturnValue({
      onClick: mockedBoundHandler,
    });

    const { result } = renderHook(() =>
      useTriggerCallback('onClick', { onClick: mockedHandler }, mockedPopupState, mockedCallback)
    );

    result.current(mockedEvent);

    expect(mockedCallback).toHaveBeenCalledWith(mockedEvent);
    expect(mockedEvent.stopPropagation).toHaveBeenCalled();
    expect(mockedBoundHandler).not.toHaveBeenCalled();
  });
});
