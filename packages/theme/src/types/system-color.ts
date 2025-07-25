import type { Tokens } from './tokens';

type SystemColor = keyof Omit<Tokens['sys']['color'], 'action' | 'text' | 'background' | 'surface'>;

export type { SystemColor };
