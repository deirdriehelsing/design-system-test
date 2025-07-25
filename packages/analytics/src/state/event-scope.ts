import type { EventScope } from '../types';

import { createContext } from 'react';

const EventScopeContext = createContext<EventScope | null>(null);

export { EventScopeContext };
