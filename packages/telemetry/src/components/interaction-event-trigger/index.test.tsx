import { render, screen, waitFor } from '@testing-library/react';
import InteractionEventTrigger from './index';
import React from 'react';
import userEvent from '@testing-library/user-event';

const mockTrackEvent = jest.fn();

jest.mock('../../hooks/use-interaction-tracker', () => () => ({
  trackEvent: mockTrackEvent,
}));

describe('InteractionEventTrigger', () => {
  afterEach(() => {
    mockTrackEvent.mockClear();
  });

  describe('rendering', () => {
    it('renders passed in element with correct props', async () => {
      const user = userEvent.setup();
      const mockElementClickHandler = jest.fn();
      render(
        <InteractionEventTrigger
          analytics={{
            action: 'test',
            category: 'mock category',
          }}
          element="button"
          elementProps={{
            className: 'mock-css-class',
            onClick: mockElementClickHandler,
          }}
        >
          Mock Content
        </InteractionEventTrigger>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Mock Content');
      expect(button).toHaveClass('mock-css-class');

      await user.click(button);

      await waitFor(() => {
        expect(mockElementClickHandler).toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(mockTrackEvent).toHaveBeenCalledWith({
          action: 'test',
          category: 'mock category',
        });
      });
    });
  });

  describe('interaction', () => {
    describe('on element click', () => {
      it('calls trackEvent from context and onClick from element props', async () => {
        const user = userEvent.setup();

        const mockElementClickHandler = jest.fn();
        render(
          <InteractionEventTrigger
            analytics={{
              action: 'test',
              category: 'mock category',
            }}
            element="button"
            elementProps={{
              className: 'mock-css-class',
              onClick: mockElementClickHandler,
            }}
          >
            Mock Content
          </InteractionEventTrigger>
        );
        const button = screen.getByRole('button');
        user.click(button);

        await waitFor(() => {
          expect(mockTrackEvent).toHaveBeenCalledTimes(1);
        });

        expect(mockTrackEvent).toHaveBeenCalledWith({
          action: 'test',
          category: 'mock category',
        });
        expect(mockElementClickHandler).toHaveBeenCalledTimes(1);
      });

      it('calls trackEvent with result of analytics function call when analytics prop is a function', async () => {
        const user = userEvent.setup();
        render(
          <InteractionEventTrigger
            analytics={(event) => ({
              action: 'test',
              category: 'mock category',
              label: event.target?.value,
            })}
            element="button"
          >
            Mock Content
          </InteractionEventTrigger>
        );

        const button = screen.getByRole('button');
        button.setAttribute('value', 'mock-arg-1');
        user.click(button);

        await waitFor(() => {
          expect(mockTrackEvent).toHaveBeenCalledTimes(1);
        });

        expect(mockTrackEvent).toHaveBeenCalledWith({
          action: 'test',
          category: 'mock category',
          label: 'mock-arg-1',
        });
      });
    });
  });
});
