import * as styles from './index.css';
import { Box, Skeleton } from '@mui/material';

interface AccountNavSkeletonProps {
  withAvatar?: boolean;
}

const AccountNavSkeleton = ({ withAvatar }: AccountNavSkeletonProps) => {
  return (
    <Box aria-label="loading" className={styles.container}>
      {withAvatar ? (
        <>
          <Skeleton animation="pulse" height={24} variant="text" width={100} />
          <Skeleton animation="pulse" height={40} variant="circular" width={40} />
        </>
      ) : (
        <Skeleton animation="pulse" height={24} variant="text" width={100} />
      )}
      <Skeleton animation="pulse" height={24} variant="text" width={16} />
    </Box>
  );
};

export default AccountNavSkeleton;
