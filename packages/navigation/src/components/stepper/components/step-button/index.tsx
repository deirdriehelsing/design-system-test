import type { MouseEvent, PropsWithChildren } from 'react';
import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';

import Button from '@blueshift-ui/core/dist/components/button';
import { activeStepAtom } from '../../../../state/stepper-atoms';
import { useSetAtom } from 'jotai';
import useValidateStepperContext from '../../../../hooks/use-validate-stepper-context';

interface StepButtonProps extends Omit<MuiButtonProps, 'onClick'> {
  onClick: (
    setActiveStep: (step: number | ((prevStep: number) => number)) => void,
    event?: MouseEvent<HTMLButtonElement>
  ) => void;
}

function StepButton({ children, onClick, ...buttonProps }: PropsWithChildren<StepButtonProps>) {
  useValidateStepperContext({ componentName: 'StepButton' });

  const setActiveStep = useSetAtom(activeStepAtom);

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    onClick(setActiveStep, event);
  }

  return (
    <Button {...buttonProps} onClick={handleClick}>
      {children}
    </Button>
  );
}

export default StepButton;
