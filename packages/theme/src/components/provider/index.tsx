import type { ThemeConfig } from '../../types';

import MuiCssBaseline from '@mui/material/CssBaseline';
import MuiStyledEngineProvider from '@mui/material/StyledEngineProvider';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import React from 'react';
import defaultThemeConfig from '../../themes/nova-aurora';

function _convertToCssVariables(
  tokens: Record<string, unknown> | number | string,
  variableName = ''
): void {
  switch (typeof tokens) {
    case 'number':
    case 'string': {
      const value = tokens;
      document.documentElement.style.setProperty(`--${variableName}`, `${value}`);
      break;
    }
    default:
      Object.getOwnPropertyNames(tokens).map((segmentName) =>
        _convertToCssVariables(
          tokens[segmentName] as Record<string, unknown>,
          `${variableName ? `${variableName}-` : ''}${segmentName}`
        )
      );
      break;
  }
}

interface ThemeProviderProps extends React.PropsWithChildren<unknown> {
  /**
   * Optional MUI theme object, defaults to Nova Aurora theme
   * @see https://mui.com/customization/theming/
   */
  themeConfig?: ThemeConfig;
}

function ThemeProvider({
  children,
  themeConfig: { resourceImports, theme, tokens } = defaultThemeConfig,
}: ThemeProviderProps) {
  React.useEffect(() => {
    if (!resourceImports?.length) {
      return;
    }

    resourceImports.forEach((resourceImport) => {
      resourceImport();
    });
  }, [resourceImports]);

  React.useEffect(() => {
    _convertToCssVariables(tokens);
  }, [tokens]);

  return (
    <MuiStyledEngineProvider injectFirst={true}>
      <MuiThemeProvider theme={theme}>
        <MuiCssBaseline />
        {children}
      </MuiThemeProvider>
    </MuiStyledEngineProvider>
  );
}

export default ThemeProvider;
