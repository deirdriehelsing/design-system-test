import Box from '@blueshift-ui/core/dist/components/box';
import Typography from '@blueshift-ui/theme/dist/components/typography';
import { noRowsOverlay } from './index.css';

function NoRowsOverlay() {
  return (
    <Box className={noRowsOverlay}>
      <Typography sx={{ color: 'palette.tertiary.main' }} variant="headlineSmall">
        No data to Display
      </Typography>
      <Typography>Try adjusting the filters or refreshing the page.</Typography>
    </Box>
  );
}

export default NoRowsOverlay;
