import type { Tokens } from './tokens';

type PaletteColor = keyof Omit<Tokens['ref']['palette'], 'surface'>;

export type { PaletteColor };
