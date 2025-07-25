import type { Theme as MuiTheme } from '@mui/material';

type Importer = () => void;

interface ThemeConfig {
  resourceImports?: Importer[];
  theme: MuiTheme;
  tokens: Record<string, any>;
}

export type { ThemeConfig };
