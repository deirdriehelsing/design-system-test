type DomEventData = {
  /** The classes attached to the trigger element (e.g. button, link) that fired the event */
  classes?: string[];
  /** An arbitrary hash of attributes */
  data?: Record<string, unknown>;
  /** The href attribute of the anchor tag that fired the event, if applicable */
  href?: string;
  /** Name attribute of the element that fired the event */
  name?: string;
  /** The component, element or function that fired the event */
  target: string;
  /** In the case of buttons and links, the text of the element */
  text?: string;
  /** Value attribute of the element that fired the event */
  value?: string;
};

export type { DomEventData };
