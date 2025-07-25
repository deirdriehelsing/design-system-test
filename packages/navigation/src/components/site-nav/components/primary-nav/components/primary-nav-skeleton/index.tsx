import { Skeleton, Stack } from '@mui/material';

const PrimaryNavSkeleton = () => {
  return (
    <Stack aria-label="loading" direction="row" spacing={2}>
      {[...Array(3)].map((_, index) => (
        <Skeleton animation="pulse" height={24} key={index} variant="text" width={120} />
      ))}
    </Stack>
  );
};

export default PrimaryNavSkeleton;
