declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    accent01: true;
    accent02: true;
    accent03: true;
    accent04: true;
    neutral: true;
  }

  interface IconButtonPropsVariantOverrides {
    icon: true;
    outlined: true;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsColorOverrides {
    accent01: true;
    accent02: true;
    accent03: true;
    accent04: true;
    neutral: true;
  }
}

export type { ExtendButtonBase, ExtendButtonBaseTypeMap } from '@mui/material/ButtonBase';

export type {
  IconButtonOwnProps,
  IconButtonProps,
  IconButtonTypeMap,
} from '@mui/material/IconButton';

// treat module declaration as override not replacement
export {};
