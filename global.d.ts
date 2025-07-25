/// <reference types="vite/client" />

import '@mui/material/Badge';
import '@mui/material/Chip';
import '@mui/material/InputBase';
import '@mui/material/SvgIcon';
import '@mui/material/styles';

interface ColorAccents {
  accent01: true;
  accent02: true;
  accent03: true;
  accent04: true;
  neutral: true;
}

declare module '*.ico' {
  const value: string;
  export default value;
}

declare module '*.json' {
  const value: any;
  export default value;
}

declare module '@mui/material/Badge' {
  interface BadgePropsVariantOverrides {
    edge: true;
  }
}

declare module '@mui/material/Chip' {
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

declare module '@mui/material/InputBase' {
  interface InputBaseComponentsPropsOverrides {
    gradient?: boolean;
  }

  interface InputBasePropsSizeOverrides {
    large: true;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    bodyLarge: true;
    bodyLargeProminent: true;
    bodyMedium: true;
    bodyMediumProminent: true;
    bodySmall: true;
    caption: true;
    displayLarge: true;
    displayMedium: true;
    displaySmall: true;
    headlineLarge: true;
    headlineMedium: true;
    headlineSmall: true;
    labelLarge: true;
    labelLargeProminent: true;
    labelMedium: true;
    labelMediumProminent: true;
    labelSmall: true;
    labelSmallProminent: true;
    titleLarge: true;
    titleLargeProminent: true;
    titleMedium: true;
    titleMediumProminent: true;
    titleSmall: true;
    titleSmallProminent: true;
  }
}

declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsColorOverrides {
    ColorAccents;
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    ColorAccents;
  }

  interface PaletteOptions {
    accent01?: PaletteColorOptions;
    accent02?: PaletteColorOptions;
    accent03?: PaletteColorOptions;
    accent04?: PaletteColorOptions;
    neutral?: PaletteColorOptions;
  }
}
