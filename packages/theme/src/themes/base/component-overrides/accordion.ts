import type { ComponentOverride, Tokens } from '../../../types';

function accordionOverrides(tokens: Tokens): ComponentOverride<'MuiAccordionSummary'> {
  return {
    MuiAccordionSummary: {
      styleOverrides: {
        expandIconWrapper: {
          color: tokens.ref.palette.primary.shade20,
        },
      },
    },
  };
}

export default accordionOverrides;
