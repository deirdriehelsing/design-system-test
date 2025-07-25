import type { PaperProps as MuiPaperProps } from '@mui/material/Paper';
import type { TypeMap } from './type-map';

type PaperColorVariant = 'saturated' | 'colored' | 'bordered' | 'empty';

declare module '@mui/material/Paper' {
  interface PaperOwnProps {
    accentColor?: 'accent01' | 'accent02' | 'accent03' | 'accent04' | 'tertiary' | 'primary';
    colorVariant?: PaperColorVariant;
  }
}

/**
 * Not all combinations of `accentColor` and `colorVariant` are valid according to the design system.
 * This type ensures that only valid combinations are used.
 */
type SaturatedAccentColors = 'primary' | 'tertiary' | 'accent03' | 'accent04';
type ColoredAccentColors = 'accent01' | 'accent02' | 'accent03' | 'accent04';
type BorderedAccentColors = 'primary' | 'accent01' | 'accent02' | 'accent03' | 'accent04';
type EmptyAccentColors = never;

interface AccentColorMap {
  bordered: BorderedAccentColors;
  colored: ColoredAccentColors;
  empty: EmptyAccentColors;
  saturated: SaturatedAccentColors;
}

interface PaperProps<T extends PaperColorVariant = 'bordered'>
  extends Omit<MuiPaperProps, 'accentColor' | 'colorVariant'> {
  accentColor?: TypeMap<AccentColorMap, T>;
  colorVariant?: T;
}

export type { PaperProps, PaperColorVariant };
