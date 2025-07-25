import type { SegmentEvent } from '@segment/analytics-next';
import type { SupplementalEventContextHelpers } from '../../../../types';

function getReferrer(event: SegmentEvent) {
  if (event.context?.page?.referrer) {
    return event.context.page.referrer;
  }

  if (document.referrer) {
    return document.referrer;
  }

  return window.localStorage.getItem('analytics-previous-url') ?? 'unknown';
}

function getEventContext(
  event: SegmentEvent,
  supplementalContextHelpers?: Pick<SupplementalEventContextHelpers, 'getSupplementalContext'>
) {
  return {
    ...event.context,
    page: {
      ...event.context?.page,
      referrer: getReferrer(event),
    },
    screen: {
      width: window.screen.width,
      height: window.screen.height,
      ...event.context?.screen,
    },
    traits: supplementalContextHelpers?.getSupplementalContext()?.user_traits,
    viewport: {
      height: window.innerHeight,
      width: window.innerWidth,
    },
  };
}

export default getEventContext;
