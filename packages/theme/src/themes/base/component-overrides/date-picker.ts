import type { ComponentOverride, Tokens } from '../../../types';

function datePickerOverrides(tokens: Tokens): ComponentOverride<'MuiDateCalendar'> {
  return {
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          '.MuiButtonBase-root': {
            color: tokens.sys.color.text.link,
          },
          '.MuiIconButton-root:hover, .MuiIconButton-root:focus': {
            backgroundColor: tokens.sys.color.secondary.light,
          },
          '.MuiIconButton-root:active': {
            backgroundColor: tokens.sys.color.neutral.main,
            color: tokens.sys.color.neutral.contrastText,
          },
          '.MuiButtonBase-root.Mui-disabled': {
            color: tokens.sys.color.action.disabled,
          },
          '.MuiPickersDay-root': {
            backgroundColor: tokens.sys.color.surface.shade100,
            color: tokens.sys.color.text.default,
          },
          '.MuiPickersDay-root:hover, .MuiPickersDay-root:focus': {
            backgroundColor: tokens.sys.color.secondary.light,
            color: tokens.sys.color.text.default,
          },
          '.MuiPickersDay-root:active': {
            backgroundColor: tokens.sys.color.neutral.main,
            color: tokens.sys.color.neutral.contrastText,
          },
          '.MuiPickersDay-root.Mui-selected, .MuiPickersDay-root.Mui-selected:focus': {
            backgroundColor: tokens.sys.color.secondary.main,
            color: tokens.sys.color.secondary.contrastText,
          },
          '.MuiPickersDay-root.Mui-disabled': {
            backgroundColor: tokens.sys.color.surface.shade100,
            color: tokens.sys.color.text.disabled,
          },
          '.MuiPickersDay-today': {
            backgroundColor: tokens.sys.color.surface.shade100,
            color: tokens.sys.color.text.default,
          },
          '.MuiPickersYear-yearButton:active': {
            backgroundColor: tokens.sys.color.neutral.main,
            color: tokens.sys.color.neutral.contrastText,
          },
          '.MuiPickersYear-yearButton:hover, .MuiPickersYear-yearButton:focus': {
            backgroundColor: tokens.sys.color.secondary.light,
            color: tokens.sys.color.text.default,
          },
          '.MuiPickersYear-yearButton.Mui-selected, .MuiPickersYear-yearButton.Mui-selected:focus':
            {
              backgroundColor: tokens.sys.color.secondary.main,
              color: tokens.sys.color.secondary.contrastText,
            },
        },
      },
    },
  };
}

export default datePickerOverrides;
