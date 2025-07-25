import type { ElementClosedEvent, ElementOpenedEvent, ElementType } from '.';

type UseElementVisibilityHandlersParams = {
  /**
   * The type of the element being tracked (accordion, dialog, drawer).
   */
  elementType: ElementType;
  /**
   * Unique identifier for the element.
   */
  id: string;
  /**
   * Additional properties to include in the event payload.
   */
  trackedProperties?: {
    close?: Partial<ElementClosedEvent>;
    open?: Partial<ElementOpenedEvent>;
  };
  /**
   * Whether to disable event tracking for the handler.
   */
  trackingDisabled?: boolean;
};

export type { UseElementVisibilityHandlersParams };
