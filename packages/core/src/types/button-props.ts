declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    accent01: true;
    accent02: true;
    accent03: true;
    accent04: true;
    neutral: true;
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

export type {
  ButtonOwnProps,
  ButtonProps,
  ButtonTypeMap,
  ExtendButton,
  ExtendButtonTypeMap,
} from '@mui/material/Button';

// treat module declaration as override not replacement
export {};
