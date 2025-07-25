import { render, screen } from '@testing-library/react';
import { ANALYTICS_EVENT_NAMES } from '../../constants';
import React from 'react';
import TrackedButton from '.';
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

describe('<TrackedButton />', () => {
  const mockId = 'test-button';
  const mockText = 'Test Button';
  const mockHref = 'http://example.com/';

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/test-path',
        href: mockHref,
      },
      writable: true,
    });
  });

  it('renders a button component with the provided props', () => {
    render(
      <TrackedButton data-testid="tracked-button" id={mockId}>
        {mockText}
      </TrackedButton>
    );

    const button = screen.getByTestId('tracked-button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(mockText);
    expect(button).toHaveAttribute('id', mockId);
  });

  it('tracks click events with the correct properties', async () => {
    const user = userEvent.setup();
    const mockClickProps = { custom_property: 'click-value' };

    render(
      <TrackedButton
        data-testid="tracked-button"
        id={mockId}
        trackedProperties={{
          click: mockClickProps,
        }}
      >
        {mockText}
      </TrackedButton>
    );

    const button = screen.getByTestId('tracked-button');
    await user.click(button);

    expect(mockTrack).toHaveBeenCalledTimes(1);
    expect(mockTrack).toHaveBeenCalledWith(
      ANALYTICS_EVENT_NAMES.elementClicked,
      expect.objectContaining({
        custom_property: 'click-value',
        element_id: mockId,
        element_type: 'button',
        page_path: '/test-path',
        page_section: 'Test',
      })
    );
  });

  it('calls the provided onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();

    render(
      <TrackedButton data-testid="tracked-button" id={mockId} onClick={mockOnClick}>
        {mockText}
      </TrackedButton>
    );

    const button = screen.getByTestId('tracked-button');
    await user.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('does not track hover events when hoverTrackingEnabled is false (default)', async () => {
    const user = userEvent.setup();

    render(
      <TrackedButton data-testid="tracked-button" id={mockId}>
        {mockText}
      </TrackedButton>
    );

    const button = screen.getByTestId('tracked-button');
    await user.hover(button);

    expect(mockTrack).not.toHaveBeenCalled();
  });

  it('tracks hover events when hoverTrackingEnabled is true', async () => {
    const user = userEvent.setup();
    const mockHoverProps = { custom_property: 'hover-value' };

    render(
      <TrackedButton
        data-testid="tracked-button"
        hoverTrackingEnabled
        id={mockId}
        trackedProperties={{
          hover: mockHoverProps,
        }}
      >
        {mockText}
      </TrackedButton>
    );

    const button = screen.getByTestId('tracked-button');
    await user.hover(button);

    expect(mockTrack).toHaveBeenCalledTimes(1);
    expect(mockTrack).toHaveBeenCalledWith(
      ANALYTICS_EVENT_NAMES.elementHovered,
      expect.objectContaining({
        custom_property: 'hover-value',
        element_id: mockId,
        element_type: 'button',
        page_section: 'Test',
      })
    );
  });

  it('calls the provided onMouseEnter handler when hovered', async () => {
    const user = userEvent.setup();
    const mockOnMouseEnter = jest.fn();

    render(
      <TrackedButton data-testid="tracked-button" id={mockId} onMouseEnter={mockOnMouseEnter}>
        {mockText}
      </TrackedButton>
    );

    const button = screen.getByTestId('tracked-button');
    await user.hover(button);

    expect(mockOnMouseEnter).toHaveBeenCalledTimes(1);
  });

  it('preserves the ability to pass a custom component to the button', () => {
    render(
      <TrackedButton component="a" data-testid="tracked-link" href="/test" id={mockId}>
        {mockText}
      </TrackedButton>
    );

    const link = screen.getByTestId('tracked-link');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });
});
