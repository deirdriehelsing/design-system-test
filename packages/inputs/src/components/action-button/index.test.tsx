import ActionButton, { ActionButtonStatus } from '.';
import React, { useCallback, useState } from 'react';
import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const actionResolved = jest.fn();

const actionRejected = jest.fn();

function ActionableButtonStory(props) {
  const { action, ...otherProps } = props;
  const [buttonStatus, setButtonStatus] = useState(ActionButtonStatus.Idle);

  const buttonAction = useCallback(async () => {
    setButtonStatus(ActionButtonStatus.Pending);

    try {
      await action();
      setButtonStatus(ActionButtonStatus.Resolved);
    } catch (error) {
      setButtonStatus(ActionButtonStatus.Rejected);
    }
  }, [action, setButtonStatus]);

  return <ActionButton {...otherProps} action={buttonAction} status={buttonStatus} />;
}

describe('<ActionButton />', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.clearAllTimers();
  });

  beforeEach(() => {
    actionResolved.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 1000)));
    actionRejected.mockImplementation(
      () => new Promise((resolve, reject) => setTimeout(reject, 1000))
    );
  });

  it('renders', () => {
    render(<ActionButton action={actionResolved}>Test</ActionButton>);
  });

  describe('before button is clicked', () => {
    it('should render the button with initial state', () => {
      render(<ActionButton action={actionResolved}>Test</ActionButton>);
      expect(screen.getByText(/test/i)).not.toBeDisabled();
    });
  });

  describe('when button is clicked', () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    it('should call the given click handler', async () => {
      const mockedOnClick = jest.fn();

      render(
        <ActionButton action={actionResolved} onClick={mockedOnClick}>
          Test
        </ActionButton>
      );
      const button = screen.getByRole('button');

      await user.click(button);

      await waitFor(() => {
        expect(mockedOnClick).toHaveBeenCalledTimes(1);
      });
    });

    it('shows CircularProgress and disables the button', async () => {
      render(<ActionableButtonStory action={actionResolved}>Test</ActionableButtonStory>);
      const button = screen.getByRole('button');

      await user.click(button);

      await waitFor(() => {
        expect(button).toBeDisabled();
      });

      const circularProgress = within(button).getByRole('progressbar');
      expect(button).toContainElement(circularProgress);
    });

    it('shows shows a success state when resolved and clears out after a while', async () => {
      render(<ActionableButtonStory action={actionResolved}>Test</ActionableButtonStory>);
      const button = screen.getByRole('button');

      await user.click(button);

      await waitFor(() => {
        expect(button).toBeDisabled();
      });

      // circular progress
      expect(button).toContainElement(within(button).getByRole('progressbar'));
      expect(button).not.toHaveClass('MuiButton-textSuccess');

      await act(() => {
        jest.runAllTimers();
      });

      await waitFor(() => {
        expect(button).not.toBeDisabled();
      });

      // circular progress
      expect(button).not.toContainElement(screen.queryByRole('progressbar'));
      expect(button).toHaveClass('MuiButton-textSuccess');

      await act(() => {
        jest.runAllTimers();
      });

      expect(button).not.toHaveClass('MuiButton-textSuccess');
    });

    it('shows shows an error state when rejected and clears out after a while', async () => {
      render(<ActionableButtonStory action={actionRejected}>Test</ActionableButtonStory>);
      const button = screen.getByRole('button');

      await user.click(button);

      await waitFor(() => {
        expect(button).toBeDisabled();
      });

      // circular progress
      expect(button).toContainElement(within(button).getByRole('progressbar'));
      expect(button).not.toHaveClass('MuiButton-textError');

      await act(() => {
        jest.runAllTimers();
      });

      await waitFor(() => {
        expect(button).not.toBeDisabled();
      });

      // circular progress
      expect(button).not.toContainElement(screen.queryByRole('progressbar'));
      expect(button).toHaveClass('MuiButton-textError');

      await act(() => {
        jest.runAllTimers();
      });

      expect(button).not.toHaveClass('MuiButton-textError');
    });

    it('shows small CircularProgress indicator', async () => {
      render(
        <ActionableButtonStory action={actionResolved} size="small">
          Test
        </ActionableButtonStory>
      );
      const button = screen.getByRole('button');

      await user.click(button);

      await waitFor(() => {
        const circularProgress = within(button).getByRole('progressbar');
        expect(circularProgress).toHaveAttribute('style', 'width: 20px; height: 20px;');
      });
    });

    it('shows large CircularProgress indicator', async () => {
      render(
        <ActionableButtonStory action={actionResolved} size="large">
          Test
        </ActionableButtonStory>
      );
      const button = screen.getByRole('button');

      await user.click(button);

      await waitFor(() => {
        const circularProgress = within(button).getByRole('progressbar');
        expect(circularProgress).toHaveAttribute('style', 'width: 28px; height: 28px;');
      });
    });

    describe('when action resolves', () => {
      it('calls onResolved', async () => {
        const onResolved = jest.fn();

        render(
          <ActionButton action={() => Promise.resolve()} onResolved={onResolved}>
            Test
          </ActionButton>
        );
        const button = screen.getByRole('button');

        await user.click(button);

        await waitFor(() => {
          expect(onResolved).toHaveBeenCalled();
        });
      });

      it('passes the resolved value to onResolved', async () => {
        const onResolved = jest.fn();
        const resolvedValue = { test: 'foobar' };

        render(
          <ActionButton action={() => Promise.resolve(resolvedValue)} onResolved={onResolved}>
            Test
          </ActionButton>
        );

        await user.click(screen.getByRole('button'));

        await waitFor(() => {
          expect(onResolved).toHaveBeenCalledWith(expect.objectContaining(resolvedValue));
        });
      });

      it('renders the success state', async () => {
        render(
          <ActionableButtonStory action={() => Promise.resolve()} resolvedFallback="Success" />
        );
        const button = screen.getByRole('button');

        await user.click(button);

        await waitFor(() => {
          expect(button).toHaveTextContent('Success');
        });
      });

      it('disables the success feedback', async () => {
        render(<ActionableButtonStory action={() => Promise.resolve()} disableSuccessFeedback />);
        const button = screen.getByRole('button');

        await user.click(button);

        await act(() => {
          jest.runAllTimers();
        });

        expect(button).not.toHaveClass('MuiButton-colorSuccess');
      });
    });

    describe('when action rejects', () => {
      it('calls onRejected', async () => {
        const onRejected = jest.fn();

        render(
          <ActionButton action={() => Promise.reject()} onRejected={onRejected}>
            Test
          </ActionButton>
        );
        const button = screen.getByRole('button');

        await user.click(button);

        await waitFor(() => {
          expect(onRejected).toHaveBeenCalled();
        });
      });

      it('renders the failure state', async () => {
        render(
          <ActionableButtonStory action={() => Promise.reject()} rejectedFallback="Failure" />
        );
        const button = screen.getByRole('button');

        await user.click(button);

        await waitFor(() => {
          expect(button).toHaveTextContent('Failure');
        });
      });

      it('disables the error feedback', async () => {
        render(<ActionableButtonStory action={() => Promise.reject()} disableErrorFeedback />);
        const button = screen.getByRole('button');

        await user.click(button);

        await act(() => {
          jest.runAllTimers();
        });

        expect(button).not.toHaveClass('MuiButton-colorError');
      });
    });
  });
});
