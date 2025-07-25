import type { ComponentOverride } from '../../../types';

function typographyOverrides(tokens: Record<string, any>): ComponentOverride<'MuiTypography'> {
  return {
    MuiTypography: {
      defaultProps: {
        fontFamily: [tokens.ref.typeface.brand, tokens.ref.typeface.plain].join(','),
        variantMapping: {
          bodyLarge: 'p',
          bodyLargeProminent: 'p',
          bodyMedium: 'p',
          bodyMediumProminent: 'p',
          bodySmall: 'p',
          displayLarge: 'h1',
          displayMedium: 'h2',
          displaySmall: 'h3',
          headlineLarge: 'h4',
          headlineMedium: 'h5',
          headlineSmall: 'h6',
          labelLarge: 'span',
          labelLargeProminent: 'span',
          labelMedium: 'span',
          labelMediumProminent: 'span',
          labelSmall: 'span',
          labelSmallProminent: 'span',
          titleLarge: 'p',
          titleLargeProminent: 'p',
          titleMedium: 'p',
          titleMediumProminent: 'p',
          titleSmall: 'p',
          titleSmallProminent: 'p',
        },
      },
    },
  };
}

export default typographyOverrides;
