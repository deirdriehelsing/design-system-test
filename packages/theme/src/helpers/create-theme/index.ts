import type { ComponentOverride, Tokens } from '../../types';

import { createTheme as MuiCreateTheme } from '@mui/material/styles';
import baseComponentOverrides from '../../themes/base/component-overrides';
import baseTypography from '../../themes/base/config/typography';

interface CreateThemeParams {
  componentOverrides?: Record<string, ComponentOverride<any> | undefined>;
  tokens: Tokens;
}

function createTheme({ componentOverrides, tokens }: CreateThemeParams) {
  return {
    resourceImports: [
      () => {
        import('@fontsource/ovo/400.css');
      },
      () => {
        import('@fontsource/poppins/400.css');
      },
      () => {
        import('@fontsource/poppins/500.css');
      },
      () => {
        import('@fontsource/poppins/600.css');
      },
      () => {
        import('@fontsource/poppins/700.css');
      },
    ],
    theme: MuiCreateTheme({
      breakpoints: {
        values: {
          xs: tokens.sys.breakpoint.xs,
          sm: tokens.sys.breakpoint.sm,
          md: tokens.sys.breakpoint.md,
          lg: tokens.sys.breakpoint.lg,
          xl: tokens.sys.breakpoint.xl,
        },
      },
      components: { ...baseComponentOverrides(tokens), ...componentOverrides },
      palette: {
        accent01: {
          main: tokens.sys.color.accent01.main,
          light: tokens.sys.color.accent01.light,
          dark: tokens.sys.color.accent01.dark,
          contrastText: tokens.sys.color.accent01.contrastText,
        },
        accent02: {
          main: tokens.sys.color.accent02.main,
          light: tokens.sys.color.accent02.light,
          dark: tokens.sys.color.accent02.dark,
          contrastText: tokens.sys.color.accent02.contrastText,
        },
        accent03: {
          main: tokens.sys.color.accent03.main,
          light: tokens.sys.color.accent03.light,
          dark: tokens.sys.color.accent03.dark,
          contrastText: tokens.sys.color.accent03.contrastText,
        },
        accent04: {
          main: tokens.sys.color.accent04.main,
          light: tokens.sys.color.accent04.light,
          dark: tokens.sys.color.accent04.dark,
          contrastText: tokens.sys.color.accent04.contrastText,
        },
        action: {
          active: tokens.sys.color.action.active,
          disabled: tokens.sys.color.action.disabled,
          disabledBackground: tokens.sys.color.action.disabledBackground,
          focus: tokens.sys.color.action.focus,
          hover: tokens.sys.color.action.hover,
          selected: tokens.sys.color.action.selected,
        },
        background: {
          default: tokens.sys.color.background.default,
          paper: tokens.sys.color.background.paper,
        },
        error: {
          main: tokens.sys.color.error.main,
          light: tokens.sys.color.error.light,
          dark: tokens.sys.color.error.dark,
          contrastText: tokens.sys.color.error.contrastText,
        },
        info: {
          main: tokens.sys.color.info.main,
          light: tokens.sys.color.info.light,
          dark: tokens.sys.color.info.dark,
          contrastText: tokens.sys.color.info.contrastText,
        },
        primary: {
          main: tokens.sys.color.primary.main,
          light: tokens.sys.color.primary.light,
          dark: tokens.sys.color.primary.dark,
          contrastText: tokens.sys.color.primary.contrastText,
        },
        secondary: {
          main: tokens.sys.color.secondary.main,
          light: tokens.sys.color.secondary.light,
          dark: tokens.sys.color.secondary.dark,
          contrastText: tokens.sys.color.secondary.contrastText,
        },
        success: {
          main: tokens.sys.color.success.main,
          light: tokens.sys.color.success.light,
          dark: tokens.sys.color.success.dark,
          contrastText: tokens.sys.color.success.contrastText,
        },
        text: {
          disabled: tokens.sys.color.text.disabled,
          primary: tokens.sys.color.text.default,
          secondary: tokens.sys.color.text.secondary,
        },
        warning: {
          main: tokens.sys.color.warning.main,
          light: tokens.sys.color.warning.light,
          dark: tokens.sys.color.warning.dark,
          contrastText: tokens.sys.color.warning.contrastText,
        },
        neutral: {
          main: tokens.sys.color.neutral.main,
          light: tokens.sys.color.neutral.light,
          dark: tokens.sys.color.neutral.dark,
          contrastText: tokens.sys.color.neutral.contrastText,
        },
      },
      shape: {
        borderRadius: 16,
      },
      shadows: [
        'none',
        tokens.sys.shadow.box.declaration01,
        tokens.sys.shadow.box.declaration02,
        tokens.sys.shadow.box.declaration03,
        tokens.sys.shadow.box.declaration04,
        tokens.sys.shadow.box.declaration05,
        tokens.sys.shadow.box.declaration06,
        tokens.sys.shadow.box.declaration07,
        tokens.sys.shadow.box.declaration08,
        tokens.sys.shadow.box.declaration09,
        tokens.sys.shadow.box.declaration10,
        tokens.sys.shadow.box.declaration11,
        tokens.sys.shadow.box.declaration12,
        tokens.sys.shadow.box.declaration13,
        tokens.sys.shadow.box.declaration14,
        tokens.sys.shadow.box.declaration15,
        tokens.sys.shadow.box.declaration16,
        tokens.sys.shadow.box.declaration17,
        tokens.sys.shadow.box.declaration18,
        tokens.sys.shadow.box.declaration19,
        tokens.sys.shadow.box.declaration20,
        tokens.sys.shadow.box.declaration21,
        tokens.sys.shadow.box.declaration22,
        tokens.sys.shadow.box.declaration23,
        tokens.sys.shadow.box.declaration24,
      ],
      typography: baseTypography,
      transitions: {
        duration: {
          shortest: tokens.sys.motion.duration.shortest,
          shorter: tokens.sys.motion.duration.shorter,
          short: tokens.sys.motion.duration.short,
          standard: tokens.sys.motion.duration.standard,
          complex: tokens.sys.motion.duration.complex,
        },
        easing: {
          easeIn: tokens.sys.motion.easing.standardAccelerate,
          easeInOut: tokens.sys.motion.easing.easeInOut,
          easeOut: tokens.sys.motion.easing.standardDecelerate,
          sharp: tokens.sys.motion.easing.standard,
        },
      },
    }),
    tokens,
  };
}

export default createTheme;
