import Box from '@blueshift-ui/core/dist/components/box';
import Typography from '@blueshift-ui/theme/dist/components/typography';

function DefaultErrorContent() {
  return (
    <Box margin={4} textAlign="center">
      <Typography variant="headlineMedium">Oops! We encountered an unexpected error.</Typography>

      <Typography mt={2} variant="bodyMedium">
        Please reload the page, and try again
      </Typography>
    </Box>
  );
}

export default DefaultErrorContent;
