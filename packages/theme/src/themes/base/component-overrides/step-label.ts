import type { ComponentOverride, Tokens } from '../../../types';

function stepLabelOverrides(tokens: Tokens): ComponentOverride<'MuiStepLabel'> {
  return {
    MuiStepLabel: {
      styleOverrides: {
        root: {
          '.BlueshiftStepIndicator-dashed & .MuiStepLabel-iconContainer': {
            paddingRight: '0.25rem',
            width: '100%',
          },

          '.MuiStepLabel-label.MuiStepLabel-alternativeLabel': {
            marginTop: '0.5rem',
          },

          // Default variant
          '.BlueshiftStepIndicator-dotted .BlueshiftStep-active &': {
            color: tokens.ref.palette.surface.shade100,
          },

          '.BlueshiftStepIndicator-dotted .BlueshiftStep-completed &': {
            color: tokens.sys.color.secondary.light,
          },

          '.BlueshiftStepIndicator-dotted .BlueshiftStep-pending &': {
            color: tokens.ref.palette.surface.shade100,
          },

          // Dashed variant
          '.BlueshiftStepIndicator-dashed .BlueshiftStep-active &': {
            color: tokens.sys.color.success.light,

            '.MuiStepLabel-label': {
              color: tokens.sys.color.success.main,
            },
          },

          '.BlueshiftStepIndicator-dashed .BlueshiftStep-completed &': {
            color: tokens.ref.palette.success.shade60,

            '.MuiStepLabel-label': {
              color: tokens.sys.color.success.main,
            },
          },

          '.BlueshiftStepIndicator-dashed .BlueshiftStep-pending &': {
            color: tokens.sys.color.neutral.light,
          },
        },
        label: {
          color: tokens.sys.color.text.default,
        },
      },
    },
  };
}

export default stepLabelOverrides;
