import { act, render, screen, within } from '@testing-library/react';
import AsyncActionButton from '.';
import React from 'react';
import userEvent from '@testing-library/user-event';

const action = jest.fn().mockResolvedValue(undefined);

describe('<AsyncActionButton />', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    action.mockClear();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('renders', () => {
    render(<AsyncActionButton action={action}>Test</AsyncActionButton>);
  });

  describe('before button is clicked', () => {
    it('renders the button with initial state', () => {
      render(<AsyncActionButton action={action}>Test</AsyncActionButton>);
      expect(screen.getByText(/test/i)).toBeEnabled();
    });
  });

  describe('when button is clicked', () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    it('calls the given click handler', async () => {
      const mockedOnClick = jest.fn();

      render(
        <AsyncActionButton action={action} onClick={mockedOnClick}>
          Test
        </AsyncActionButton>
      );

      await user.click(screen.getByText('Test'));
      expect(mockedOnClick).toHaveBeenCalledTimes(1);

      await act(() => {
        jest.runAllTimers();
      });
    });

    it('shows CircularProgress and disables the button', async () => {
      render(<AsyncActionButton action={action}>Test</AsyncActionButton>);
      const button = screen.getByRole('button', { name: /test/i });

      await user.click(button);

      const circularProgress = within(button).getByRole('progressbar');
      expect(button).toBeDisabled();
      expect(button).toContainElement(circularProgress);

      await act(() => {
        jest.runAllTimers();
      });
    });

    it('shows small CircularProgress indicator', async () => {
      render(
        <AsyncActionButton action={action} size="small">
          Test
        </AsyncActionButton>
      );
      const button = screen.getByRole('button', { name: /test/i });

      await user.click(button);

      const circularProgress = within(button).getByRole('progressbar');
      expect(circularProgress).toHaveStyle({ width: '20px', height: '20px' });

      await act(() => {
        jest.runAllTimers();
      });
    });

    it('shows large CircularProgress indicator', async () => {
      render(
        <AsyncActionButton action={action} size="large">
          Test
        </AsyncActionButton>
      );
      const button = screen.getByRole('button', { name: /test/i });

      await user.click(button);

      const circularProgress = within(button).getByRole('progressbar');
      expect(circularProgress).toHaveStyle({ width: '28px', height: '28px' });

      await act(() => {
        jest.runAllTimers();
      });
    });

    describe('when action resolves', () => {
      it('calls onResolved', async () => {
        const onResolved = jest.fn();

        render(
          <AsyncActionButton action={action} onResolved={onResolved}>
            Test
          </AsyncActionButton>
        );

        await user.click(screen.getByText(/test/i));

        await act(() => {
          jest.runAllTimers();
        });

        expect(onResolved).toHaveBeenCalled();
      });

      it('passes the resolved value to onResolved', async () => {
        const onResolved = jest.fn();
        const resolvedValue = { test: 'foobar' };
        const resolveAction = jest.fn().mockResolvedValue(resolvedValue);

        render(
          <AsyncActionButton action={resolveAction} onResolved={onResolved}>
            Test
          </AsyncActionButton>
        );

        await user.click(screen.getByText(/test/i));

        await act(() => {
          jest.runAllTimers();
        });

        expect(onResolved).toHaveBeenCalledWith(resolvedValue);
      });
    });

    describe('when action rejects', () => {
      it('calls onRejected', async () => {
        const onRejected = jest.fn();
        const rejectAction = jest.fn().mockRejectedValue(new Error('test error'));

        render(
          <AsyncActionButton action={rejectAction} onRejected={onRejected}>
            Test
          </AsyncActionButton>
        );

        await user.click(screen.getByText(/test/i));

        await act(() => {
          jest.runAllTimers();
        });

        expect(onRejected).toHaveBeenCalled();
      });
    });

    describe('after 3 seconds', () => {
      it('sets the button to idle state', async () => {
        render(<AsyncActionButton action={action}>Test</AsyncActionButton>);
        const button = screen.getByText(/test/i);

        await user.click(button);
        expect(button).toBeEnabled();

        await act(() => {
          jest.runAllTimers();
        });
      });
    });
  });
});
