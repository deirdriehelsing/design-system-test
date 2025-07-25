import componentOverrides from './component-overrides';
import createTheme from '../../helpers/create-theme';
import { bossaAuroraTokens as tokens } from '@blueshift-ui/tokens';

const bossaAuroraThemeConfig = createTheme({
  componentOverrides: componentOverrides(tokens),
  tokens,
});

export default bossaAuroraThemeConfig;
