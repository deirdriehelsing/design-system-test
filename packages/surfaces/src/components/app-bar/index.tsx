import type { AppBarProps } from '../../types';

import MuiAppBar from '@mui/material/AppBar';
import MuiSlide from '@mui/material/Slide';
import Toolbar from '../toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import useTheme from '@blueshift-ui/theme/dist/hooks/use-theme';

function AppBar({ children, withoutSlide = false, ...appBarProps }: AppBarProps) {
  const scrollTrigger = useScrollTrigger();
  const theme = useTheme();

  if (withoutSlide) {
    return (
      <MuiAppBar {...appBarProps}>
        <Toolbar>{children}</Toolbar>
      </MuiAppBar>
    );
  }

  return (
    <MuiSlide
      appear={false}
      direction="down"
      easing={{
        enter: theme.transitions.easing.easeInOut,
        exit: theme.transitions.easing.easeInOut,
      }}
      in={!scrollTrigger}
    >
      <MuiAppBar {...appBarProps}>
        <Toolbar>{children}</Toolbar>
      </MuiAppBar>
    </MuiSlide>
  );
}

export default AppBar;
