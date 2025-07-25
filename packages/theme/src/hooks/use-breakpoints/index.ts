import { useMediaQuery, useTheme } from '..';

function useBreakpoints() {
  const theme = useTheme();
  const isSmallViewport = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumViewport = useMediaQuery(theme.breakpoints.down('md'));
  const isLargeViewport = useMediaQuery(theme.breakpoints.up('md'));
  const isExtraLargeViewport = useMediaQuery(theme.breakpoints.up('lg'));

  return {
    isSmallViewport,
    isMediumViewport,
    isLargeViewport,
    isExtraLargeViewport,
  };
}

export default useBreakpoints;
