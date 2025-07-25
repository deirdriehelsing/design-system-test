import type { IconButtonProps as MuiIconButtonProps } from '@mui/material/IconButton';
import type { PropsWithChildren } from 'react';

import IconButton from '@blueshift-ui/core/dist/components/icon-button';
import { activeStepAtom } from '../../../../state/stepper-atoms';
import { useSetAtom } from 'jotai';
import useValidateStepperContext from '../../../../hooks/use-validate-stepper-context';

type EdgeProps = Pick<MuiIconButtonProps, 'edge'>;

interface StepIconButtonProps extends Omit<MuiIconButtonProps, 'onClick'> {
  edge?: EdgeProps['edge'];
  onClick: (setActiveStep: (step: number | ((prevStep: number) => number)) => void) => void;
}

function StepIconButton({
  children,
  edge,
  onClick,
  ...buttonProps
}: PropsWithChildren<StepIconButtonProps>) {
  useValidateStepperContext({ componentName: 'StepIconButton' });

  const setActiveStep = useSetAtom(activeStepAtom);

  function handleClick() {
    onClick(setActiveStep);
  }

  return (
    <IconButton {...buttonProps} edge={edge} onClick={handleClick}>
      {children}
    </IconButton>
  );
}

export default StepIconButton;
