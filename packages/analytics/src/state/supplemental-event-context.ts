import type { SupplementalEventContext } from '../types';

import { atom } from 'jotai';

const supplementalEventContextAtom = atom<SupplementalEventContext | null>(null);

export { supplementalEventContextAtom };
