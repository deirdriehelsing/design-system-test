import '@mui/material/Chip';

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    accent01: true;
    accent02: true;
    accent03: true;
    accent04: true;
  }

  interface ChipPropsSizeOverrides {
    large: true;
  }

  interface ChipPropsVariantOverrides {
    link: true;
  }

  interface ChipClasses {
    labelLarge: string;
    sizeLarge: string;
  }
}

export type { ChipProps } from '@mui/material/Chip';
