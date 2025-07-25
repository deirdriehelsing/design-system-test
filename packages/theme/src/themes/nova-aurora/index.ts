import componentOverrides from './component-overrides';
import createTheme from '../../helpers/create-theme';
import { novaAuroraTokens as tokens } from '@blueshift-ui/tokens';

const novaAuroraThemeConfig = createTheme({
  componentOverrides: componentOverrides(tokens),
  tokens,
});

export default novaAuroraThemeConfig;
