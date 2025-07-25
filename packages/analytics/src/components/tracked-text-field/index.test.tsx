import { render, screen } from '@testing-library/react';
import { ANALYTICS_EVENT_NAMES } from '../../constants';
import React from 'react';
import TrackedTextField from '.';
import userEvent from '@testing-library/user-event';

const mockTrack = jest.fn();

jest.mock('../../hooks/use-analytics', () => ({
  __esModule: true,
  default: () => ({ track: mockTrack }),
}));

jest.mock('../../hooks/use-event-scope', () => ({
  __esModule: true,
  default: () => ({ pageSection: 'Test' }),
}));

describe('<TrackedTextField />', () => {
  const createTestProps = (overrides = {}) => ({
    id: 'test-input',
    placeholder: 'Enter text here',
    'data-testid': 'tracked-input',
    ...overrides,
  });

  const baseExpectedTrackingProps = {
    element_id: 'test-input',
    element_type: 'input',
    input_type: 'text',
    is_input_masked: false,
    page_path: '/test-path',
    page_section: 'Test',
  };

  beforeEach(() => {
    // Set up location for consistent testing
    Object.defineProperty(window, 'location', {
      value: { pathname: '/test-path' },
      writable: true,
    });
  });

  it('renders a text field with the provided props', () => {
    const props = createTestProps();
    render(<TrackedTextField {...props} />);

    const input = screen.getByPlaceholderText(props.placeholder);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', props.id);
  });

  describe('event tracking', () => {
    it('tracks blur events with the correct properties', async () => {
      const props = createTestProps();
      const testValue = 'Test input value';
      const user = userEvent.setup();

      render(<TrackedTextField {...props} />);

      const input = screen.getByPlaceholderText(props.placeholder);
      await user.click(input);
      await user.type(input, testValue);
      await user.tab(); // Tab out to trigger blur

      expect(mockTrack).toHaveBeenCalledWith(
        ANALYTICS_EVENT_NAMES.userEnteredInput,
        expect.objectContaining({
          ...baseExpectedTrackingProps,
          input_action: 'blur',
          input_state: 'filled',
        })
      );
    });

    it('handles masked input correctly', async () => {
      const props = createTestProps({
        placeholder: 'Enter password',
        type: 'password',
      });
      const testValue = 'Test input value';
      const user = userEvent.setup();

      render(<TrackedTextField {...props} />);

      const input = screen.getByPlaceholderText(props.placeholder);

      await user.click(input);
      await user.type(input, testValue);
      await user.tab(); // Tab out to trigger blur

      expect(mockTrack).toHaveBeenCalledWith(
        ANALYTICS_EVENT_NAMES.userEnteredInput,
        expect.objectContaining({
          input_type: 'password',
          is_input_masked: true,
        })
      );
    });

    it('forwards custom trackedProperties to analytics events', async () => {
      const mockTrackedProps = { metadata: { form_name: 'test-form' } };
      const props = createTestProps({ trackedProperties: mockTrackedProps });
      const testValue = 'Test input value';
      const user = userEvent.setup();

      render(<TrackedTextField {...props} />);

      const input = screen.getByPlaceholderText(props.placeholder);

      await user.click(input);
      await user.type(input, testValue);
      await user.tab(); // Tab out to trigger blur

      expect(mockTrack).toHaveBeenCalledWith(
        ANALYTICS_EVENT_NAMES.userEnteredInput,
        expect.objectContaining({
          element_id: props.id,
          metadata: { form_name: 'test-form' },
        })
      );
    });
  });

  describe('event handlers', () => {
    it('calls the provided event handlers', async () => {
      const mockOnChange = jest.fn();
      const mockOnFocus = jest.fn();
      const mockOnBlur = jest.fn();
      const props = createTestProps({
        onChange: mockOnChange,
        onFocus: mockOnFocus,
        onBlur: mockOnBlur,
      });
      const testValue = 'Test input value';
      const user = userEvent.setup();

      render(<TrackedTextField {...props} />);

      const input = screen.getByPlaceholderText(props.placeholder);

      await user.click(input);
      expect(mockOnFocus).toHaveBeenCalledTimes(1);

      await user.type(input, testValue);
      expect(mockOnChange).toHaveBeenCalledTimes(testValue.length);

      await user.tab();
      expect(mockOnBlur).toHaveBeenCalledTimes(1);
    });
  });
});
