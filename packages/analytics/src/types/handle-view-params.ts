import type { ContentViewedEvent } from '.';

type PageViewedEvent = {
  [property: string]: any;
  category: string;
};

type HandleContentViewParams = {
  trackedProperties: ContentViewedEvent;
  type: 'content';
};

type HandlePageViewParams = {
  trackedProperties: PageViewedEvent;
  type: 'page';
};

export type { HandleContentViewParams, HandlePageViewParams, PageViewedEvent };
