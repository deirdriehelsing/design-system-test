import { render, screen } from '@testing-library/react';
import { ANALYTICS_EVENT_NAMES } from '../../constants';
import React from 'react';
import TrackedLink from '.';
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

describe('<TrackedLink />', () => {
  const mockId = 'test-link';
  const mockText = 'Test Link';
  const mockHref = '#example'; // Using a hash because that's the only thing jsdom supports

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/test-path',
        href: mockHref,
      },
      writable: true,
    });
  });

  it('renders a link component with the provided props', () => {
    render(
      <TrackedLink data-testid="tracked-link" href={mockHref} id={mockId}>
        {mockText}
      </TrackedLink>
    );

    const link = screen.getByTestId('tracked-link');

    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent(mockText);
    expect(link).toHaveAttribute('id', mockId);
    expect(link).toHaveAttribute('href', mockHref);
  });

  it('tracks click events with the correct properties', async () => {
    const user = userEvent.setup();
    const mockClickProps = { custom_property: 'click-value' };

    render(
      <TrackedLink
        data-testid="tracked-link"
        href={mockHref}
        id={mockId}
        trackedProperties={{
          click: mockClickProps,
        }}
      >
        {mockText}
      </TrackedLink>
    );

    const link = screen.getByTestId('tracked-link');
    await user.click(link);

    expect(mockTrack).toHaveBeenCalledTimes(1);
    expect(mockTrack).toHaveBeenCalledWith(
      ANALYTICS_EVENT_NAMES.elementClicked,
      expect.objectContaining({
        custom_property: 'click-value',
        element_id: mockId,
        element_type: 'a',
        page_path: '/test-path',
        page_section: 'Test',
      })
    );
  });

  it('calls the provided onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();

    render(
      <TrackedLink data-testid="tracked-link" href={mockHref} id={mockId} onClick={mockOnClick}>
        {mockText}
      </TrackedLink>
    );

    const link = screen.getByTestId('tracked-link');
    await user.click(link);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('does not track hover events when hoverTrackingEnabled is false (default)', async () => {
    const user = userEvent.setup();

    render(
      <TrackedLink data-testid="tracked-link" href={mockHref} id={mockId}>
        {mockText}
      </TrackedLink>
    );

    const link = screen.getByTestId('tracked-link');
    await user.hover(link);

    expect(mockTrack).not.toHaveBeenCalled();
  });

  it('tracks hover events when hoverTrackingEnabled is true', async () => {
    const user = userEvent.setup();
    const mockHoverProps = { custom_property: 'hover-value' };

    render(
      <TrackedLink
        data-testid="tracked-link"
        hoverTrackingEnabled
        href={mockHref}
        id={mockId}
        trackedProperties={{
          hover: mockHoverProps,
        }}
      >
        {mockText}
      </TrackedLink>
    );

    const link = screen.getByTestId('tracked-link');
    await user.hover(link);

    expect(mockTrack).toHaveBeenCalledTimes(1);
    expect(mockTrack).toHaveBeenCalledWith(
      ANALYTICS_EVENT_NAMES.elementHovered,
      expect.objectContaining({
        custom_property: 'hover-value',
        element_id: mockId,
        element_type: 'a',
        page_section: 'Test',
      })
    );
  });

  it('calls the provided onMouseEnter handler when hovered', async () => {
    const user = userEvent.setup();
    const mockOnMouseEnter = jest.fn();

    render(
      <TrackedLink
        data-testid="tracked-link"
        href={mockHref}
        id={mockId}
        onMouseEnter={mockOnMouseEnter}
      >
        {mockText}
      </TrackedLink>
    );

    const link = screen.getByTestId('tracked-link');
    await user.hover(link);

    expect(mockOnMouseEnter).toHaveBeenCalledTimes(1);
  });

  it('preserves the ability to pass a custom component to the link', () => {
    render(
      <TrackedLink
        component="button"
        data-testid="tracked-link-as-button"
        id={mockId}
        type="button"
      >
        {mockText}
      </TrackedLink>
    );

    const button = screen.getByTestId('tracked-link-as-button');

    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveAttribute('type', 'button');
  });
});
