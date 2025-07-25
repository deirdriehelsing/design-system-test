import type { ElementClickedEvent, ElementHoveredEvent } from '../../types';

import { render, screen } from '@testing-library/react';
import { House as HouseIcon } from '@phosphor-icons/react';
import React from 'react';
import TrackedIconButton from '.';
import userEvent from '@testing-library/user-event';

const mockTrack = jest.fn();

jest.mock('../../hooks/use-analytics', () => ({
  __esModule: true,
  default: () => ({ track: mockTrack }),
}));

describe('<TrackedIconButton />', () => {
  const defaultProps = {
    id: 'test-icon-button',
    'aria-label': 'Test Button',
  };

  it('renders correctly', () => {
    render(<TrackedIconButton {...defaultProps} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('tracks click events', async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();

    render(
      <TrackedIconButton {...defaultProps} onClick={onClick}>
        <HouseIcon />
      </TrackedIconButton>
    );

    await user.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalled();
    expect(mockTrack).toHaveBeenCalledWith('Element Clicked', {
      element_id: 'test-icon-button',
      element_text: 'Test Button',
      element_type: 'button',
      page_path: '/',
    } as ElementClickedEvent);
  });

  it('tracks hover events when enabled', async () => {
    const onMouseEnter = jest.fn();
    const user = userEvent.setup();

    render(
      <TrackedIconButton {...defaultProps} hoverTrackingEnabled={true} onMouseEnter={onMouseEnter}>
        <HouseIcon />
      </TrackedIconButton>
    );

    await user.hover(screen.getByRole('button'));

    expect(onMouseEnter).toHaveBeenCalled();
    expect(mockTrack).toHaveBeenCalledWith('Element Hovered', {
      element_id: 'test-icon-button',
      element_text: 'Test Button',
      element_type: 'button',
      page_path: '/',
    } as ElementHoveredEvent);
  });

  it('does not track hover events when disabled', async () => {
    const onMouseEnter = jest.fn();
    const user = userEvent.setup();

    render(
      <TrackedIconButton {...defaultProps} onMouseEnter={onMouseEnter}>
        <HouseIcon />
      </TrackedIconButton>
    );

    await user.hover(screen.getByRole('button'));

    expect(onMouseEnter).toHaveBeenCalled();
    expect(mockTrack).not.toHaveBeenCalledWith('Element Hovered', expect.any(Object));
  });

  it('includes custom tracked properties in events', async () => {
    const user = userEvent.setup();
    const customProperties = {
      click: {
        custom_property: 'click-value',
        action_type: 'navigation',
      },
      hover: {
        custom_property: 'hover-value',
        interaction_type: 'exploration',
      },
    };

    render(
      <TrackedIconButton
        {...defaultProps}
        hoverTrackingEnabled
        trackedProperties={customProperties}
      >
        <HouseIcon />
      </TrackedIconButton>
    );

    await user.click(screen.getByRole('button'));
    expect(mockTrack).toHaveBeenCalledWith('Element Clicked', {
      element_id: 'test-icon-button',
      element_text: 'Test Button',
      element_type: 'button',
      page_path: '/',
      custom_property: 'click-value',
      action_type: 'navigation',
    } as ElementClickedEvent);

    await user.hover(screen.getByRole('button'));
    expect(mockTrack).toHaveBeenCalledWith('Element Hovered', {
      element_id: 'test-icon-button',
      element_text: 'Test Button',
      element_type: 'button',
      page_path: '/',
      custom_property: 'hover-value',
      interaction_type: 'exploration',
    } as ElementHoveredEvent);
  });
});
