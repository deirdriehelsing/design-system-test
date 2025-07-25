import type { Dispatch, SetStateAction } from 'react';
import type { SupplementalEventContext } from './supplemental-event-context';

interface SupplementalEventContextHelpers {
  getSupplementalContext: () => SupplementalEventContext | null;
  setSupplementalContext: Dispatch<SetStateAction<SupplementalEventContext | null>>;
}

export type { SupplementalEventContextHelpers };
