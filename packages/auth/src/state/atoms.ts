import type { ActiveLearner, LDClient } from '../types';

import { atom } from 'jotai/vanilla';

const activeLearner = atom<ActiveLearner | undefined>(undefined);

const launchDarklyClient = atom<LDClient | undefined>(undefined);

export { activeLearner, launchDarklyClient };
