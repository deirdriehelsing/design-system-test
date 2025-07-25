import type { ButtonProps } from '@mui/material/Button';
import type { IconProps as PhosphorIconProps } from '@phosphor-icons/react';

import { CaretDown as CaretDownIcon, CaretUp as CaretUpIcon } from '@phosphor-icons/react';
import Button from '@blueshift-ui/core/dist/components/button';
import React from 'react';

const iconProps: PhosphorIconProps = {
  size: '1rem',
  weight: 'bold',
};

interface DropdownButtonProps extends ButtonProps {
  open?: boolean;
}

/** An extension of the Button component that renders a caret up/down icon based on the `open` property. */
const DropdownButton = React.forwardRef<HTMLButtonElement, DropdownButtonProps>(
  ({ open, ...props }, ref) => (
    <Button
      endIcon={open ? <CaretUpIcon {...iconProps} /> : <CaretDownIcon {...iconProps} />}
      ref={ref}
      {...props}
    />
  )
);

export default DropdownButton;
