import type { ColorName } from '@blueshift-ui/core/dist/types';
import type { BoxProps as MuiBoxProps } from '@mui/material/Box';
import type { ReactNode } from 'react';
import type { TypographyProps } from '@mui/material/Typography';

import * as styles from './index.css';
import Box from '@blueshift-ui/core/dist/components/box';
import Typography from '@blueshift-ui/theme/dist/components/typography';
import classNames from 'clsx';
import mapColorNameToMuiColorPath from '@blueshift-ui/core/dist/helpers/map-color-name-to-mui-color-path';

interface PitchProps extends MuiBoxProps {
  children?: ReactNode;
  color?: ColorName;
  icon: ReactNode;
  typographyProps?: TypographyProps;
}

function Pitch({
  children,
  color = 'accent01',
  icon,
  typographyProps,
  ...muiBoxProps
}: PitchProps) {
  return (
    <Box
      component="figure"
      {...muiBoxProps}
      className={classNames(muiBoxProps.className, styles.wrapper)}
    >
      <Box aria-hidden="true" color={mapColorNameToMuiColorPath(color)}>
        {icon}
      </Box>
      <Typography
        component="figcaption"
        variant="labelMedium"
        {...typographyProps}
        className={classNames(styles.typography, typographyProps?.className)}
      >
        {children}
      </Typography>
    </Box>
  );
}

export default Pitch;
