import type { Breakpoint } from '@mui/material';
import type { ControlsVariant } from '../components/carousel/hooks/use-swiper-props';
import type { OverridableStringUnion } from '@mui/types';
import type React from 'react';
import type { ReactNode } from 'react';
import type { TypographyPropsVariantOverrides } from '@mui/material/Typography/Typography';
import type { Variant } from '@mui/material/styles/createTypography';

interface CarouselProps {
  controlsVariant?: ControlsVariant;
  description?: ReactNode;
  descriptionComponent?: React.ElementType;
  descriptionVariant?: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>;
  /** Will cause slides out of view to become 'inert', not responding to input or tabbing */
  disableOutOfView?: boolean;
  fullBleed?: boolean;
  items: React.ReactElement[];
  maxWidth?: Breakpoint | string;
  onChange?: () => void;
  size?: 'large' | 'small';
  spaceBetween?: number | string;
  title?: ReactNode;
  titleComponent?: React.ElementType;
  titleVariant?: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>;
}

export type { CarouselProps };
