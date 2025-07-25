import type { ElementClickedEvent, ElementHoveredEvent, TrackedPropertiesParam } from '.';

type TrackedElementClickedProps<TrackedEvent = ElementClickedEvent> = {
  /**
   * Additional properties to include in the element clicked event payload.
   */
  trackedProperties?: {
    click?: TrackedPropertiesParam<TrackedEvent>;
  };
};

type TrackedElementHoveredProps<TrackedEvent = ElementHoveredEvent> = {
  /**
   * Additional properties to include in the event payload.
   */
  trackedProperties?: {
    hover?: TrackedPropertiesParam<TrackedEvent>;
  };
};

type ClickableAndHoverableElementProps = TrackedElementClickedProps & TrackedElementHoveredProps;

export type {
  ClickableAndHoverableElementProps,
  TrackedElementClickedProps,
  TrackedElementHoveredProps,
};
