import { render, screen, waitFor } from '@testing-library/react';
import ExpandableContent from '.';
import React from 'react';
import userEvent from '@testing-library/user-event';

const mockOnExpandToggle = jest.fn();
jest.mock('./index.css', () => ({
  container: {
    top: 'container-top',
    bottom: 'container-bottom',
  },
  trigger: {
    top: 'trigger-top',
    bottom: 'trigger-bottom',
  },
  expandableContent: {
    top: 'expandableContent-top',
    bottom: 'expandableContent-bottom',
  },
}));

describe('<ExpandableContent />', () => {
  it('should render with collapsed content', () => {
    render(
      <ExpandableContent
        ariaLabel="expandable-content"
        defaultExpanded={false}
        id="expandable-content"
      >
        Content to be collapsed/expanded.
      </ExpandableContent>
    );

    expect(screen.getByText('Content to be collapsed/expanded.')).not.toBeVisible();
  });

  it('should render with expanded content', () => {
    render(
      <ExpandableContent
        ariaLabel="expandable-content"
        defaultExpanded={true}
        id="expandable-content"
      >
        Content to be collapsed/expanded.
      </ExpandableContent>
    );

    expect(screen.getByText('Content to be collapsed/expanded.')).toBeVisible();
  });

  it('should toggle visibility when controller is clicked', async () => {
    const user = userEvent.setup();

    render(
      <ExpandableContent
        ariaLabel="expandable-content"
        defaultExpanded={false}
        id="expandable-content"
        triggerTextCollapsed="Read more"
        triggerTextExpanded="Read less"
      >
        Content to be collapsed/expanded.
      </ExpandableContent>
    );

    const controller = screen.getByText('Read more');

    expect(screen.getByText('Content to be collapsed/expanded.')).not.toBeVisible();
    expect(controller).toHaveAttribute('aria-expanded', 'false');

    await user.click(controller);
    expect(screen.getByText('Content to be collapsed/expanded.')).toBeVisible();
    expect(controller).toHaveAttribute('aria-expanded', 'true');

    await user.click(controller);

    await waitFor(() => {
      expect(screen.getByText('Content to be collapsed/expanded.')).not.toBeVisible();
    });

    expect(controller).toHaveAttribute('aria-expanded', 'false');
  });

  it('should call onClick controller function with the expanded state as a boolean when controller is clicked', async () => {
    const user = userEvent.setup();

    render(
      <ExpandableContent
        ariaLabel="expandable-content"
        defaultExpanded={false}
        id="expandable-content"
        onExpandToggle={(expanded) => mockOnExpandToggle(expanded)}
        triggerTextCollapsed="Read more"
        triggerTextExpanded="Read less"
      >
        Content to be collapsed/expanded.
      </ExpandableContent>
    );

    await user.click(screen.getByText('Read more'));

    expect(mockOnExpandToggle).toHaveBeenCalledWith(true);
  });
});
