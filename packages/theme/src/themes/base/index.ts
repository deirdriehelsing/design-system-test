import componentOverrides from './component-overrides';
import createTheme from '../../helpers/create-theme';
import { baseTokens as tokens } from '@blueshift-ui/tokens';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    bodyLarge: React.CSSProperties;
    bodyLargeProminent: React.CSSProperties;
    bodyMedium: React.CSSProperties;
    bodyMediumProminent: React.CSSProperties;
    bodySmall: React.CSSProperties;
    displayLarge: React.CSSProperties;
    displayMedium: React.CSSProperties;
    displaySmall: React.CSSProperties;
    headlineLarge: React.CSSProperties;
    headlineMedium: React.CSSProperties;
    headlineSmall: React.CSSProperties;
    labelLarge: React.CSSProperties;
    labelLargeProminent: React.CSSProperties;
    labelMedium: React.CSSProperties;
    labelMediumProminent: React.CSSProperties;
    labelSmall: React.CSSProperties;
    labelSmallProminent: React.CSSProperties;
    titleLarge: React.CSSProperties;
    titleLargeProminent: React.CSSProperties;
    titleMedium: React.CSSProperties;
    titleMediumProminent: React.CSSProperties;
    titleSmall: React.CSSProperties;
    titleSmallProminent: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    bodyLarge?: React.CSSProperties;
    bodyLargeProminent?: React.CSSProperties;
    bodyMedium?: React.CSSProperties;
    bodyMediumProminent?: React.CSSProperties;
    bodySmall?: React.CSSProperties;
    displayLarge?: React.CSSProperties;
    displayMedium?: React.CSSProperties;
    displaySmall?: React.CSSProperties;
    headlineLarge?: React.CSSProperties;
    headlineMedium?: React.CSSProperties;
    headlineSmall?: React.CSSProperties;
    labelLarge?: React.CSSProperties;
    labelLargeProminent?: React.CSSProperties;
    labelMedium?: React.CSSProperties;
    labelMediumProminent?: React.CSSProperties;
    labelSmall?: React.CSSProperties;
    labelSmallProminent?: React.CSSProperties;
    titleLarge?: React.CSSProperties;
    titleLargeProminent?: React.CSSProperties;
    titleMedium?: React.CSSProperties;
    titleMediumProminent?: React.CSSProperties;
    titleSmall?: React.CSSProperties;
    titleSmallProminent?: React.CSSProperties;
  }
}

const baseThemeConfig = createTheme({
  componentOverrides: componentOverrides(tokens),
  tokens,
});

export default baseThemeConfig;
