import type { ButtonProps } from '@mui/material/Button';

import * as styles from './index.css';
import Box from '../box';
import Button from '../button';
import classNames from 'clsx';

function RoundButton(props: ButtonProps) {
  // Extract the variant with a default value to make TypeScript happy
  const variant = (props.variant ?? 'contained') as keyof typeof styles.buttonVariant;

  const className = classNames(
    styles.buttonBase,
    styles.buttonSize?.[props.size ?? 'medium'],
    styles.buttonVariant[variant],
    props.className
  );

  return (
    <Box className={styles.wrapper}>
      <Button {...props} className={className} />
    </Box>
  );
}

export default RoundButton;
